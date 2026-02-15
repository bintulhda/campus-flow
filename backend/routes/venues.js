const express = require('express');
const {
  getAllVenues,
  getVenueById,
  createVenue,
} = require('../controllers/venueController');

const router = express.Router();

// GET /api/venues - Get all venues
router.get('/', getAllVenues);

// GET /api/venues/:id - Get single venue
router.get('/:id', getVenueById);

// POST /api/venues - Create venue (admin)
router.post('/', createVenue);

module.exports = router;
