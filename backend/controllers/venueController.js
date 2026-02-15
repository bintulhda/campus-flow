const { mockDB } = require('../config/db');

// Get all venues
const getAllVenues = async (req, res) => {
  try {
    res.json({ count: mockDB.venues.length, venues: mockDB.venues });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch venues', message: error.message });
  }
};

// Get single venue
const getVenueById = async (req, res) => {
  try {
    const venue = mockDB.venues.find(v => v._id === req.params.id);
    if (!venue) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch venue', message: error.message });
  }
};

// Create venue (admin)
const createVenue = async (req, res) => {
  try {
    const { name, capacity, location, description, amenities } = req.body;

    if (!name || !capacity || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const venue = {
      _id: Date.now().toString(),
      name,
      capacity,
      location,
      description,
      amenities,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockDB.venues.push(venue);
    res.status(201).json({ message: 'Venue created', venue });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create venue', message: error.message });
  }
};

module.exports = {
  getAllVenues,
  getVenueById,
  createVenue,
};
