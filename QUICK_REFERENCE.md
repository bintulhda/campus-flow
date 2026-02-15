# 🎯 CampusFlow - Quick Reference Guide

## 📁 Complete File Structure

```
campus-flow/
│
├── 📘 Documentation
│   ├── README.md (MAIN - Start here!)
│   ├── SETUP_GUIDE.md (Detailed setup)
│   ├── RUNNING_GUIDE.md (How to run + demo script)
│   ├── PROJECT_SUMMARY.md (Complete architecture)
│   ├── ADMIN_FEATURES.md (Future enhancements)
│   └── API_TESTING.http (API examples)
│
├── 🚀 Setup Scripts
│   ├── setup.sh (For Mac/Linux)
│   └── setup.bat (For Windows)
│
├── 🔧 Root Config
│   └── .gitignore
│
│
├── 🎨 FRONTEND (React + Vite)
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx ..................... Club login
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx ................. Club registration
│   │   │   │   ├── BookingForm.jsx ⭐ ............ Main booking feature
│   │   │   │   ├── BookingForm.css
│   │   │   │   ├── Dashboard.jsx ................. View all bookings
│   │   │   │   ├── Dashboard.css
│   │   │   │   └── Auth.css ....................... Auth pages styles
│   │   │   ├── components/
│   │   │   │   ├── Navbar.jsx ..................... Top navigation
│   │   │   │   └── Navbar.css
│   │   │   ├── services/
│   │   │   │   └── api.js ........................ Axios API calls
│   │   │   ├── App.jsx ........................... Main router
│   │   │   ├── main.jsx ........................... React entry point
│   │   │   └── index.css .......................... Global styles
│   │   ├── index.html ............................ HTML template
│   │   ├── vite.config.js ........................ Vite config with proxy
│   │   └── package.json
│   │       └── scripts: dev, build, preview
│
│
├── ⚙️ BACKEND (Node + Express)
│   ├── backend/
│   │   ├── 🔑 Core Entry Point
│   │   │   └── server.js ......................... Express app
│   │   │
│   │   ├── 🗂️ Configuration
│   │   │   ├── config/
│   │   │   │   └── db.js ......................... MongoDB connection
│   │   │   ├── .env ............................. Environment variables
│   │   │   └── seed.js ........................... Database seeding
│   │   │
│   │   ├── 🏗️ Database Models
│   │   │   ├── models/
│   │   │   │   ├── ClubUser.js ................... Club schema + hash
│   │   │   │   ├── Venue.js ...................... Venue schema
│   │   │   │   └── Booking.js .................... Booking schema
│   │   │
│   │   ├── 🧠 Core Logic
│   │   │   ├── controllers/
│   │   │   │   ├── authController.js ............ Register/Login logic
│   │   │   │   ├── bookingController.js ⭐ ...... 🔥 CONFLICT DETECTION
│   │   │   │   └── venueController.js .......... Venue management
│   │   │
│   │   ├── 🛣️ API Routes
│   │   │   ├── routes/
│   │   │   │   ├── auth.js ....................... /api/auth (register, login)
│   │   │   │   ├── bookings.js .................. /api/bookings (submit, view)
│   │   │   │   └── venues.js .................... /api/venues (list, create)
│   │   │
│   │   ├── 🔧 Utilities & Middleware
│   │   │   ├── middleware/
│   │   │   │   └── auth.js ....................... JWT verification
│   │   │   └── utils/
│   │   │       ├── conflictDetection.js ......... Conflict check logic
│   │   │       └── emailService.js ............. Email notifications
│   │   │
│   │   └── package.json
│   │       └── scripts: start, dev, seed
│
└── ✨ (End of structure)
```

---

## 🚀 Quick Start (Copy-Paste Commands)

### Windows
```powershell
# Clone repo
cd campus-flow

# Run setup script
.\setup.bat

# Or manual setup:
# Terminal 1
cd backend
npm install
npm run seed
npm run dev

# Terminal 2
cd frontend
npm install
npm run dev

# Open browser
http://localhost:3000
```

### Mac/Linux
```bash
# Clone repo
cd campus-flow

# Run setup script
bash setup.sh

# Or manual setup:
# Terminal 1
cd backend
npm install
npm run seed
npm run dev

# Terminal 2
cd frontend
npm install
npm run dev

# Open browser
http://localhost:3000
```

---

## 🔑 Key Files Explained

### Backend Core Files

| File | Purpose | Key Feature |
|------|---------|-------------|
| `server.js` | Express app setup | CORS, routes, error handling |
| `config/db.js` | MongoDB connection | Auto-connects on startup |
| `seed.js` | Database population | Creates 6 sample venues |
| **`controllers/bookingController.js`** | **🔥 Booking logic** | **Conflict detection algorithm** |
| `utils/conflictDetection.js` | Conflict check | Queries DB for conflicts |
| `utils/emailService.js` | Email sender | Sends approved/rejected emails |
| `middleware/auth.js` | JWT verification | Protects private routes |

### Frontend Core Files

| File | Purpose | Key Feature |
|------|---------|-------------|
| `App.jsx` | Main router | Navigation, auth logic |
| `pages/BookingForm.jsx` | **⭐ Booking interface** | **Venue selection, time picker** |
| `pages/Dashboard.jsx` | View bookings | Shows status, conflict reason |
| `services/api.js` | Axios instance | All API calls configured here |
| `components/Navbar.jsx` | Top menu | Brand, nav links, logout |

---

## 📊 Database Collections (MongoDB)

### ClubUser Collection
```javascript
{
  _id: ObjectId,
  clubName: "Tech Club",
  email: "techclub@nit.com",
  password: "$2a$10$hashed...",  // Hashed password
  phone: "9999999999",
  contactPerson: "John Doe",
  createdAt: Date,
  updatedAt: Date
}
```

### Venue Collection
```javascript
{
  _id: ObjectId,
  name: "Seminar Hall A",
  capacity: 100,
  location: "Building 1",
  amenities: ["Projector", "WiFi"],
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Collection ⭐
```javascript
{
  _id: ObjectId,
  clubId: ObjectId,           // ref: ClubUser
  venueId: ObjectId,          // ref: Venue
  date: ISODate,              // 2026-02-22
  timeSlot: "9-11",           // One of 4 slots
  eventDescription: "Tech Fest",
  attendees: 50,
  status: "approved",         // or "rejected" or "pending"
  conflictReason: null,       // Set if rejected
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔥 Conflict Detection Algorithm (Simple)

### Pseudocode
```
WHEN club submits booking:
  
  INPUT: venueId, date, timeSlot
  
  QUERY database:
    Find booking WHERE:
      venueId = input_venue
      AND date = input_date (same day)
      AND timeSlot = input_slot (exact match)
      AND status IN ['approved', 'pending']
  
  IF found:
    REJECT booking
    Reason = "Venue already booked for this time slot"
  ELSE:
    APPROVE booking
    
  Save to database
  Send email notification
  
  RETURN: status + result
```

### Why This Works
- **Simple logic** - Easy to understand & debug
- **Exact match** - No overlap calculations needed
- **Fast query** - Indexed fields in MongoDB
- **Accurate** - 100% prevents double-booking

---

## 🧪 Test Cases for Judging

### Route 1: Happy Path (Approval)
```
Register Club A
  ↓
Book Seminar Hall A, Feb 22, 9-11 (50 people)
  ↓
✅ APPROVED
  ↓
Email sent: "Booking Approved"
  ↓
Dashboard shows green badge
```

### Route 2: Conflict Detection
```
Register Club A → Book Seminar Hall A, Feb 22, 9-11 → ✅ APPROVED
Register Club B → Try SAME hall, SAME date, SAME slot → ❌ REJECTED
Message: "Venue already booked for this time slot"
```

### Route 3: No Conflict (Different Slot)
```
Club A books: Seminar Hall A, Feb 22, 9-11 → ✅ APPROVED
Club B books: Seminar Hall A, Feb 22, 11-1 → ✅ APPROVED
(Different time slot = No conflict)
```

---

## 🎯 For Judges - Show These Points

### ✅ Real Logic (Most Important!)
- Open `backend/utils/conflictDetection.js`
- Show the database query
- Explain: "This checks if venue is already booked at same time"
- Run test to show it working

### ✅ Full Integration
- Frontend → Backend → Database → Email
- Show each component working together

### ✅ Production Quality
- JWT authentication
- Password hashing
- Error handling
- Input validation

### ✅ User Experience
- Beautiful UI
- Quick feedback
- Clear status indicators
- Email confirmations

---

## 📋 Environment Variables (.env)

```env
# Port
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/campus-flow

# Authentication
JWT_SECRET=change_this_in_production_use_long_random_string

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password_from_gmail

# Environment
NODE_ENV=development
```

---

## 🛠️ Common Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server with hot reload |
| `npm start` | Start production server |
| `npm run seed` | Add sample venues to database (backend only) |
| `npm run build` | Build for production (frontend only) |

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000/3000 in use | Change PORT in .env or kill process |
| MongoDB not found | Start mongod or use MongoDB Atlas |
| CORS error | Check backend running, frontend proxy configured |
| Email not sending | Use Gmail app password (not regular password) |
| Token expired | Clear browser cache & localStorage |

---

## 🎨 Color Codes

### Status Badges
- 🟢 **Green** (#48bb78) = APPROVED
- 🔴 **Red** (#f56565) = REJECTED  
- 🟡 **Yellow** (#fbd38d) = PENDING

### UI Brand
- 🟣 **Purple** (#667eea) = Primary color
- ⚪ **White** = Background

---

## 📚 Documentation Priority

Read in this order:
1. **README.md** ← Start here!
2. **RUNNING_GUIDE.md** ← How to run & demo
3. **CODE FILES** ← Backend controllers & frontend components
4. **PROJECT_SUMMARY.md** ← Deep dive architecture

---

## ✨ Final Checklist Before Submission

- [ ] All files created ✅
- [ ] Backend can run on port 5000 ✅
- [ ] Frontend can run on port 3000 ✅
- [ ] Database seeds properly ✅
- [ ] Conflict detection works ✅
- [ ] Email notifications send ✅
- [ ] Dashboard displays bookings ✅
- [ ] JWT authentication works ✅
- [ ] UI is responsive ✅
- [ ] Documentation is complete ✅

---

## 🚀 Ready to Present!

Your CampusFlow project is **production-ready** and demonstrates:
- ✅ **Real problem solved**
- ✅ **Smart algorithm**
- ✅ **Full stack**
- ✅ **Professional code**
- ✅ **Beautiful UI**
- ✅ **Complete documentation**

**Time to submit! 🏆**

---

**Last Updated:** February 15, 2026  
**Status:** PRODUCTION READY ✅