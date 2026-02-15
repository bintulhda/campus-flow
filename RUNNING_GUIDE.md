# CampusFlow - Final Checklist & Running Guide

## ✅ PRE-LAUNCH CHECKLIST

### Backend Setup
- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Create `.env` file with all required variables
- [ ] MongoDB is running (check with `mongod`)
- [ ] Run `npm run seed` to create sample venues
- [ ] Run `npm run dev` (should show "port 5000")

### Frontend Setup
- [ ] Navigate to `frontend` folder
- [ ] Run `npm install`
- [ ] Run `npm run dev` (should show "port 3000")
- [ ] Check browser opens automatically or go to http://localhost:3000

### Email Configuration
- [ ] Gmail 2-factor authentication enabled
- [ ] App password generated
- [ ] App password added to backend/.env as EMAIL_PASS

---

## 🚀 RUNNING THE APPLICATION

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```
Expected output:
```
✅ MongoDB connected successfully
🚀 CampusFlow Backend running on port 5000
```

### Terminal 2: Seed Database (ONE TIME)
```bash
cd backend
npm run seed
```
Expected output:
```
✅ Connected to MongoDB
✅ Venues seeded successfully
   1. Seminar Hall A (Capacity: 100)
   2. Seminar Hall B (Capacity: 80)
   3. Conference Room (Capacity: 50)
   4. Main Auditorium (Capacity: 300)
   5. Mini Auditorium (Capacity: 150)
   6. Lab A (Capacity: 40)
✅ Database seeding complete!
```

### Terminal 3: Start Frontend
```bash
cd frontend
npm run dev
```
Expected output:
```
  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

---

## 📝 TESTING THE APPLICATION

### Step 1: Register First Club
1. Go to http://localhost:3000
2. Click "Register here"
3. Fill form:
   - Club Name: Tech Club
   - Email: techclub@nit.com
   - Password: password123
   - Phone: 9999999999
   - Contact: John Doe
4. Click "Register"
5. ✅ Should auto-login and redirect to Dashboard

### Step 2: Make First Booking
1. Click "New Booking" button
2. Select: Seminar Hall A
3. Pick date: 2026-02-22 (or any future date)
4. Select time: 9-11
5. Attendees: 50
6. Description: Annual Tech Fest
7. Click "🚀 Submit Booking"
8. ✅ Should see "✅ Booking APPROVED"
9. Check Dashboard - booking visible with GREEN status

### Step 3: Test Conflict Detection
1. Click "Logout"
2. Click "Register here"
3. Register Second Club:
   - Club Name: Science Club
   - Email: scienceclub@nit.com
   - Password: password123
4. Make booking:
   - Select: **SAME** venue (Seminar Hall A)
   - Pick: **SAME** date (2026-02-22)
   - Select: **SAME** time (9-11)
   - Attendees: 40
   - Description: Science Symposium
5. Click "🚀 Submit Booking"
6. ✅ Should see "❌ Booking REJECTED - Venue already booked"
7. Check Dashboard - booking visible with RED status + conflict reason

### Step 4: Test No Conflict (Different Time Slot)
1. Make another booking (same club):
   - Select: Seminar Hall A
   - Pick: 2026-02-22 (same date)
   - Select: **11-1** (different time slot)
   - Attendees: 35
2. Click "🚀 Submit Booking"
3. ✅ Should see "✅ Booking APPROVED"
4. Dashboard shows both bookings:
   - First: RED (9-11, rejected)
   - Second: GREEN (11-1, approved)

---

## ✉️ EMAIL VERIFICATION

When a booking is made:
1. Check your Gmail inbox for confirmation emails
2. **Approved booking:** "✅ Booking Approved - CampusFlow"
3. **Rejected booking:** "❌ Booking Rejected - CampusFlow"
4. Both include booking details

---

## 🐛 COMMON ISSUES & FIXES

### Issue: Cannot connect to MongoDB
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix:** 
- On Windows: Start MongoDB with `mongod` in PowerShell
- Or use MongoDB Atlas (cloud): Update `MONGODB_URI` in .env

### Issue: CORS Error in Browser
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix:**
- Backend CORS is already enabled
- Make sure both frontend (3000) and backend (5000) are running
- Clear browser cache

### Issue: Email not sending
```
Error: Invalid login
```
**Fix:**
- Use Gmail **App Password** (not regular password)
- Enable 2-factor authentication first
- Update `.env` with correct credentials

### Issue: Ports already in use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Fix:**
- Kill process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)
- Or change PORT in `.env`

### Issue: Token expired
```
Error: Invalid token
```
**Fix:**
- Clear browser localStorage
- Re-login (new token generated)

---

## 🎯 DEMO FOR JUDGES (Script)

**Time: ~5 minutes**

```
1. Show Frontend (0:00-0:15)
   - Beautiful, clean UI
   - Responsive design
   - Easy navigation

2. Register Club 1 (0:15-0:45)
   - Fill registration form
   - Show auto-login
   - Show Dashboard (empty)

3. First Booking (0:45-1:30)
   - Click "New Booking"
   - Select venue, date, time
   - Submit booking
   - ✅ Show APPROVED status
   - Show in Dashboard with green badge

4. Register Club 2 (1:30-2:00)
   - Go back and register different club
   - Show different clubs can login

5. Conflict Test (2:00-3:30)
   - Try booking SAME venue, SAME date, SAME time
   - ❌ Show REJECTED message
   - Show conflict reason in Dashboard
   - Show red badge

6. Non-Conflict Test (3:30-4:30)
   - Try booking same venue, same date, DIFFERENT time
   - ✅ Show APPROVED
   - Show green badge in Dashboard

7. Show Backend (4:30-5:00)
   - Open terminal, show `npm run seed`
   - Show database seeding
   - Show MongoDB data structure
   - Explain conflict detection logic
```

---

## 📊 BACKEND EXPLANATION FOR JUDGES

### Conflict Detection Algorithm
**File:** `backend/utils/conflictDetection.js`

```javascript
// Check if venue is already booked at same date/time
const conflictingBooking = await Booking.findOne({
  venueId,              // Same venue
  date: {               // Same date
    $gte: startOfDay,
    $lte: endOfDay,
  },
  timeSlot,             // Same time slot
  status: { $in: ['approved', 'pending'] }  // Check against booked slots
});

// Returns true if conflict found, false if available
return conflictingBooking ? true : false;
```

**Why it's smart:**
- Checks database in real-time
- Simple but effective
- Prevents double-booking with 100% accuracy
- No overlapping time slots needed (slots don't overlap)

---

## 🎓 WHAT JUDGES LOOK FOR

✅ **Real Problem Solved** - CampusFlow solves actual campus issue
✅ **Backend Logic** - Conflict detection is real logic
✅ **Full Stack** - Frontend + Backend + Database
✅ **Automation** - No manual intervention needed
✅ **Professional Code** - Clean, well-structured
✅ **User Experience** - Intuitive, responsive UI
✅ **Security** - JWT, password hashing, input validation
✅ **Error Handling** - Graceful fallbacks
✅ **Scalability** - Can add more venues, clubs, time slots

---

## 🚀 NEXT STEPS (After Hackathon)

- [ ] Deploy backend to Heroku/Render
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Add admin panel for stats
- [ ] Add notification preferences
- [ ] Add venue availability calendar
- [ ] Add repeat booking option
- [ ] Add SMS notifications
- [ ] Add payment integration
- [ ] Add analytics dashboard

---

## 📞 SUPPORT

If stuck:
1. Check SETUP_GUIDE.md
2. Check API_TESTING.http for examples
3. Review backend/routes logs
4. Check browser console errors

---

**Good luck with your hackathon! 🏆**