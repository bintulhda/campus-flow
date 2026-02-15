# CampusFlow - Complete Setup & Deployment Guide

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js v14+ installed
- MongoDB running locally OR MongoDB Atlas connection string
- Gmail app password (for email notifications)

---

## 📦 Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment (.env)
Create `.env` file in backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus-flow
JWT_SECRET=your_secure_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=development
```

### 3. Run Backend
```bash
npm run dev
```
✅ Backend running on http://localhost:5000

---

## 🎨 Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Frontend
```bash
npm run dev
```
✅ Frontend running on http://localhost:3000

---

## 📊 Database Setup (MongoDB)

### Option A: Local MongoDB
```bash
# Install MongoDB locally and start
mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env`: `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/campus-flow`

---

## 🧪 Sample Data (Seeding Venues)

### Add Venues via API
```bash
curl -X POST http://localhost:5000/api/venues \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Seminar Hall A",
    "capacity": 100,
    "location": "Building 1",
    "amenities": ["Projector", "Whiteboard", "AC"]
  }'
```

**Add multiple venues:**
```javascript
// Backend: Create db/seed.js
const mongoose = require('mongoose');
const Venue = require('../models/Venue');

const venues = [
  { name: "Seminar Hall A", capacity: 100, location: "Building 1", amenities: ["Projector"] },
  { name: "Seminar Hall B", capacity: 80, location: "Building 2", amenities: ["Projector", "WiFi"] },
  { name: "Conference Room", capacity: 50, location: "Admin Block", amenities: ["Whiteboard"] },
  { name: "Auditorium", capacity: 300, location: "Main Hall", amenities: ["Sound System", "Projector"] },
];

mongoose.connect(process.env.MONGODB_URI);
Venue.insertMany(venues).then(() => console.log("✅ Venues seeded"));
```

Run: `node db/seed.js`

---

## 🧠 Core Logic Explanation

### Conflict Detection Algorithm
**File:** `backend/utils/conflictDetection.js`

```javascript
IF venue_id == same 
   AND date == same 
   AND time_slot == same
   AND status IN ['approved', 'pending']
   → CONFLICT FOUND (Return TRUE) → Auto-REJECT

ELSE
   → NO CONFLICT (Return FALSE) → Auto-APPROVE
```

**Time Slots:** 9-11, 11-1, 2-4, 4-6 (No overlap between slots)

---

## 🔑 API Endpoints

### Auth
- `POST /api/auth/register` - Register club
- `POST /api/auth/login` - Login club (returns JWT)

### Bookings
- `POST /api/bookings` - Submit booking (requires JWT)
- `GET /api/bookings/my-bookings` - Get club's bookings (requires JWT)
- `GET /api/bookings` - Get all bookings (admin stats)

### Venues
- `GET /api/venues` - List all venues
- `GET /api/venues/:id` - Get venue details
- `POST /api/venues` - Create venue (admin)

---

## 🔒 Authentication Flow

1. Club registers → password hashed with bcryptjs
2. Club logs in → JWT token generated (valid 7 days)
3. JWT included in Authorization header for protected routes
4. Backend verifies token via middleware

---

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate App Password (not regular password)
3. Use app password in `.env`

### Email Triggers
- Booking approved → Confirmation email sent
- Booking rejected (conflict) → Rejection email with reason

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Check if MongoDB is running: mongod
Or update connection string to MongoDB Atlas
```

### CORS Error
```
Backend already has CORS enabled.
Make sure frontend proxy is configured (vite.config.js)
```

### Email Not Sending
```
1. Verify Gmail credentials in .env
2. Use Gmail App Password (not regular password)
3. Enable "Less Secure Apps" if using old Gmail
```

### Token Errors
```
Clear localStorage and re-login
```

---

## 🚢 Deployment

### Backend (Heroku/Render)
```bash
# Add Procfile
web: node server.js

# Deploy with MongoDB Atlas URL
```

### Frontend (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy dist folder
```

---

## 📁 Final Project Structure
```
campus-flow/
├── backend/
│   ├── models/ (Booking, Venue, ClubUser)
│   ├── controllers/ (bookingController, authController)
│   ├── routes/ (bookings, venues, auth)
│   ├── utils/ (conflictDetection, emailService)
│   ├── middleware/ (auth.js)
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/ (Login, Register, BookingForm, Dashboard)
│   │   ├── components/ (Navbar)
│   │   ├── services/ (api.js)
│   │   ├── App.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
└── README.md
```

---

## 🎯 Next Steps
- Add more venues to database
- Test booking conflicts
- Configure email
- Deploy to production

Happy Building! 🚀
