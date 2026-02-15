# Backend - CampusFlow API

## 📦 Setup
```bash
npm install
npm run dev
```

## 🗂️ Backend Structure
```
backend/
├── server.js                 # Express entry point
├── config/
│   └── db.js                 # Database connection
├── models/
│   ├── Booking.js            # Booking schema
│   ├── Venue.js              # Venue schema
│   └── User.js               # Club user schema
├── routes/
│   ├── bookings.js           # /api/bookings
│   ├── venues.js             # /api/venues
│   └── auth.js               # /api/auth
├── controllers/
│   ├── bookingController.js  # Booking logic & conflict detection
│   ├── venueController.js    # Venue management
│   └── authController.js     # Authentication
├── utils/
│   ├── emailService.js       # Send emails
│   └── conflictDetection.js  # Conflict check logic
├── middleware/
│   └── auth.js               # JWT verification
└── .env                       # Environment variables
```

## 🔑 Key Endpoints
- `POST /api/auth/register` - Club signup
- `POST /api/bookings` - Submit booking request
- `GET /api/bookings` - View all bookings
- `GET /api/venues` - List all venues

## ⚙️ Core Logic
**Conflict Detection** (`utils/conflictDetection.js`):
```
IF venue_id == same AND date == same AND time_slot overlaps
  → Return conflict = TRUE (auto-reject)
ELSE
  → Return conflict = FALSE (auto-approve)
```
