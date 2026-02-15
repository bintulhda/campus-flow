# Frontend - CampusFlow UI

## 📦 Setup
```bash
npm install
npm run dev
```

## 🗂️ Frontend Structure
```
frontend/
├── src/
│   ├── pages/
│   │   ├── BookingForm.jsx       # Club booking form
│   │   ├── Dashboard.jsx         # View booking status
│   │   ├── VenueList.jsx         # Shows available venues
│   │   └── Login.jsx             # Club login
│   ├── components/
│   │   ├── BookingStatus.jsx     # Shows approved/rejected
│   │   ├── TimeSlotSelector.jsx  # 9-11, 11-1, 2-4, 4-6
│   │   └── VenueCart.jsx         # Venue selection
│   ├── services/
│   │   └── api.js                # Axios API calls
│   ├── App.jsx                   # Main app
│   └── main.jsx                  # Entry point
├── index.html
└── vite.config.js
```

## 🎨 Pages Overview
1. **Login** - Club authentication
2. **Booking Form** - Select venue, date, time slot
3. **Dashboard** - Track booking status (Pending/Approved/Rejected)
