# 🏟️ CampusFlow - Smart Venue Booking & Conflict Prevention

> **Solving the real campus problem of double-booked venues**

## 🎯 Problem Statement
At NIT Jalandhar & similar institutions:
- Clubs book seminar halls via WhatsApp / Google Sheets ❌
- Multiple clubs request same venue → **Conflicts happen** ❌
- Manual checking required → Time-consuming ❌
- No visibility of booking status ❌
- Repeated follow-ups → Chaos ❌

## ✅ Our Solution
**CampusFlow** - Automated venue booking with intelligent conflict detection
- ✅ Club submits booking
- ✅ System checks venue availability (real-time)
- ✅ Auto-approve if available
- ✅ Auto-reject if conflict (with reason)
- ✅ Send email confirmation
- ✅ Dashboard to track status

---

## 🏗️ Tech Stack
- **Frontend**: React.js 18 + Vite + Axios
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT (7-day expiry)
- **Email**: Nodemailer (Gmail SMTP)
- **Styling**: CSS3 + Responsive Design

---

## 🔥 Core Features

### 1. 🔐 Club Authentication
- Register club account
- Secure login with JWT
- Password hashing with bcryptjs

### 2. 📅 Smart Booking System
- Select venue from dropdown
- Pick date and time slot
- Enter attendee count
- System checks **real-time availability**

### 3. ⚡ Conflict Detection (Core Logic)
```
IF venue_id == same 
   AND date == same 
   AND time_slot == same 
   AND status IN ['approved', 'pending']
→ CONFLICT! Auto-REJECT

ELSE
→ NO CONFLICT! Auto-APPROVE
```

**Time Slots:** 9-11, 11-1, 2-4, 4-6 (No overlap between slots, simple math)

### 4. 📧 Automatic Email Notifications
- ✅ APPROVED - Booking confirmed
- ❌ REJECTED - Conflict reason explained
- Both include booking details

### 5. 📊 Dashboard & History
- View all your bookings
- See status (Pending/Approved/Rejected)
- Track when booking was created
- Conflict reason visible if rejected

### 6. 🏛️ Venue Management
- Browse available venues
- See capacity & location
- Check amenities (Projector, WiFi, Sound System, etc.)

---

## 📊 System Architecture

```
Club User (Frontend)
        ↓
Registration/Login (JWT)
        ↓
Booking Form
        ↓
Backend API (/api/bookings)
        ↓
Conflict Detection Logic
        ↓
[Check MongoDB]
[venue_id + date + timeSlot]
        ↓
    ┌───┴───┐
    ↓       ↓
  CONFLICT NO CONFLICT
    ↓       ↓
  REJECT  APPROVE
    ↓       ↓
[Save to DB + Send Email]
    ↓
Show Result to Club
    ↓
Dashboard View
```

---

## 🚀 Quick Start (5 minutes)

### 1️⃣ Prerequisites
```bash
Node.js v14+
MongoDB (local or Atlas)
Gmail account (for emails)
```

### 2️⃣ Clone & Install
```bash
git clone <repo>
cd campus-flow

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3️⃣ Configure Environment
**backend/.env**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus-flow
JWT_SECRET=your_secret_key_here_change_in_prod
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=development
```

### 4️⃣ Seed Database
```bash
# Terminal in backend folder
npm run seed
```
→ Creates 6 sample venues

### 5️⃣ Start Application
```bash
# Terminal 1: Backend (port 5000)
cd backend && npm run dev

# Terminal 2: Frontend (port 3000)
cd frontend && npm run dev
```

### 6️⃣ Open Browser
```
👉 http://localhost:3000
```

---

## 📁 Repository Structure

```
campus-flow/
├── backend/
│   ├── server.js                 # Express entry point
│   ├── seed.js                   # Database seeding
│   ├── .env                       # Environment config
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── ClubUser.js           # Club schema + password hashing
│   │   ├── Venue.js              # Venue schema
│   │   └── Booking.js            # Booking schema
│   ├── routes/
│   │   ├── auth.js               # POST /register, POST /login
│   │   ├── bookings.js           # POST /, GET /my-bookings, GET /
│   │   └── venues.js             # GET /, POST /
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── bookingController.js  # 🔥 Conflict detection logic
│   │   └── venueController.js    # Venue management
│   ├── utils/
│   │   ├── conflictDetection.js  # 🧠 Core logic
│   │   └── emailService.js       # Email sending
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Club login
│   │   │   ├── Register.jsx      # Club registration
│   │   │   ├── BookingForm.jsx   # ⭐ Main booking interface
│   │   │   └── Dashboard.jsx     # View bookings
│   │   ├── components/
│   │   │   └── Navbar.jsx        # Navigation
│   │   ├── services/
│   │   │   └── api.js            # Axios API calls
│   │   ├── App.jsx               # Main app with routes
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── vite.config.js
│   ├── index.html
│   └── package.json
│
├── SETUP_GUIDE.md                # Detailed setup
├── API_TESTING.http              # API examples
├── ADMIN_FEATURES.md             # Future features
├── setup.sh                       # Auto setup script
└── README.md                      # This file
```

---

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register club |
| POST | `/api/auth/login` | ❌ | Login & get JWT |

### Bookings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/bookings` | ✅ | Submit booking request |
| GET | `/api/bookings/my-bookings` | ✅ | Get club's bookings |
| GET | `/api/bookings` | ❌ | Get all bookings (admin stats) |

### Venues
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/venues` | ❌ | List all venues |
| GET | `/api/venues/:id` | ❌ | Get venue details |
| POST | `/api/venues` | ❌ | Create venue (admin) |

---

## 🧪 Testing the Conflict Logic

### Test Case 1: Successful Booking ✅
```
Club 1 books Seminar Hall A on 2026-02-22, 9-11
→ Result: APPROVED ✅
```

### Test Case 2: Conflict Detection 🚫
```
Club 1 books Seminar Hall A on 2026-02-22, 9-11 → APPROVED ✅
Club 2 books SAME venue, SAME date, SAME slot → REJECTED ❌
Reason: "Venue already booked for this time slot"
```

### Test Case 3: Different Slot = OK ✅
```
Club 1 books Seminar Hall A on 2026-02-22, 9-11 → APPROVED ✅
Club 2 books Seminar Hall A on 2026-02-22, 11-1 → APPROVED ✅
(Different time slot, no conflict)
```

---

## 🎨 Frontend Pages

### 1. **Login Page**
- Club email & password
- Link to register

### 2. **Register Page**
- Club name, email, password
- Contact person phone
- Auto login after registration

### 3. **Booking Form** ⭐
- Venue dropdown (auto-fetches from DB)
- Date picker
- Time slot selector (4 options)
- Attendee count input
- Event description (optional)
- Shows result immediately

### 4. **Dashboard**
- Grid of all club bookings
- Status badges (Approved/Rejected/Pending)
- Color-coded (Green/Red/Yellow)
- Conflict reason shown if rejected
- Timestamp of when booking was created

---

## 🔐 Security Features

✅ **Password Security**
- Hashed with bcryptjs (10 rounds)
- Never stored in plain text

✅ **JWT Authentication**
- Tokens expire in 7 days
- Required for protected endpoints
- Verified via middleware

✅ **CORS Enabled**
- Frontend can communicate with backend
- Proxy configured in Vite

✅ **Input Validation**
- Required fields checked
- Venue capacity validated
- Date/time format verified

---

## 📧 Email Configuration

### Gmail Setup (Required for emails)
1. Go to https://myaccount.google.com/security
2. Enable 2-factor authentication
3. Generate App Password
4. Copy 16-char password to `.env` as `EMAIL_PASS`

### Email Templates
- **Approved:** Confirmation with booking details
- **Rejected:** Rejection reason + suggestion

---

## 🚢 Deployment Options

### Backend (Heroku/Render/Railway)
```bash
# Add Procfile
web: node server.js

# Push to Heroku
heroku login
heroku create campus-flow-api
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy /dist folder
```

---

## 🧠 Why This Project Is Impressive

### ✅ **Real Backend Logic**
- Actual conflict detection algorithm
- Not dummy logic
- Solves real campus problem

### ✅ **Full Stack**
- Frontend (React) + Backend (Node) + Database (MongoDB)
- Professional architecture
- Production-ready code

### ✅ **Automation**
- No manual intervention
- Instant decisions
- Auto Email notifications

### ✅ **User Experience**
- Clean, intuitive UI
- Real-time feedback
- Mobile responsive

### ✅ **Security**
- JWT authentication
- Password hashing
- Input validation

### ✅ **Scalability**
- Database indexed
- Handles concurrent requests
- Can add more venues/time slots

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Check if mongod is running or MongoDB Atlas URL |
| CORS error | Ensure backend CORS enabled, frontend proxy configured |
| Email not sending | Verify Gmail app password in .env, enable 2-factor auth |
| Token expired | Clear localStorage, re-login |

---

## 📚 Documentation Files
- [`SETUP_GUIDE.md`](SETUP_GUIDE.md) - Detailed setup instructions
- [`API_TESTING.http`](API_TESTING.http) - API examples for testing
- [`ADMIN_FEATURES.md`](ADMIN_FEATURES.md) - Future enhancements

---

## 🎯 For Hackathon Judges

**Why CampusFlow is unique:**
1. **Solves REAL Campus Problem** - No manual coordination needed
2. **Smart Logic** - Real conflict detection algorithm
3. **Complete Stack** - Frontend + Backend + Database + Emails
4. **Production Ready** - Error handling, validation, security
5. **Impressive Demo** - Show conflict detection in action
6. **Scalable** - Can handle many clubs & venues

**Demo Script:**
1. Register 2 clubs
2. Club 1 books venue → ✅ Shows APPROVED
3. Club 2 books SAME venue/date/time → ❌ Shows REJECTED
4. Club 2 books DIFFERENT time → ✅ Shows APPROVED
5. Dashboard shows all bookings with status

---

## 👨‍💻 Team

Built with ❤️ for NIT Jalandhar Hackathon

---

## 📄 License

MIT License - Feel free to use and modify

---

**Happy Coding! 🚀**
