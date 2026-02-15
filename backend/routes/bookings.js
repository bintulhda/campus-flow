const express = require('express');
const {
  submitBooking,
  getClubBookings,
  getAllBookings,
} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/bookings - Submit booking (protected)
router.post('/', authMiddleware, submitBooking);

// GET /api/bookings/my-bookings - Get club's bookings (protected)
router.get('/my-bookings', authMiddleware, getClubBookings);

// GET /api/bookings - Get all bookings (admin)
router.get('/', getAllBookings);

module.exports = router;
