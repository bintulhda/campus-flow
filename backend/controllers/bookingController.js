const { mockDB } = require('../config/db');

// Submit booking request
const submitBooking = async (req, res) => {
  try {
    const { venueId, date, timeSlot, eventDescription, attendees } = req.body;
    const clubId = req.clubId;

    // Validate inputs
    if (!venueId || !date || !timeSlot || !attendees) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Fetch venue and club details
    const venue = mockDB.venues.find(v => v._id === venueId);
    const club = mockDB.users.find(u => u._id === clubId);

    if (!venue) {
      return res.status(404).json({ error: 'Venue not found' });
    }

    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    // Check venue capacity
    if (attendees > venue.capacity) {
      return res.status(400).json({
        error: `Venue capacity exceeded. Max: ${venue.capacity}`,
      });
    }

    // Check for conflicts
    const bookingDate = new Date(date);
    const hasConflict = mockDB.bookings.some(b => 
      b.venueId === venueId && 
      new Date(b.date).toDateString() === bookingDate.toDateString() && 
      b.timeSlot === timeSlot &&
      b.status === 'approved'
    );

    // Create booking record
    const booking = {
      _id: Date.now().toString(),
      clubId,
      venueId,
      date: bookingDate,
      timeSlot,
      eventDescription,
      attendees,
      status: hasConflict ? 'rejected' : 'approved',
      conflictReason: hasConflict ? 'Venue already booked for this time slot' : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockDB.bookings.push(booking);

    // Response
    const responseMessage = hasConflict
      ? '❌ Booking REJECTED - Venue already booked'
      : '✅ Booking APPROVED - Confirmation sent';

    res.status(201).json({
      message: responseMessage,
      booking: {
        id: booking._id,
        status: booking.status,
        conflictReason: booking.conflictReason,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Booking submission failed', message: error.message });
  }
};

// Get all bookings for a club
const getClubBookings = async (req, res) => {
  try {
    const clubId = req.clubId;

    const bookings = mockDB.bookings.filter(b => b.clubId === clubId).map(b => {
      const venue = mockDB.venues.find(v => v._id === b.venueId);
      return { ...b, venueId: venue };
    });

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings', message: error.message });
  }
};

// Get all bookings (admin/stats)
const getAllBookings = async (req, res) => {
  try {
    const bookings = mockDB.bookings.map(b => {
      const club = mockDB.users.find(u => u._id === b.clubId);
      const venue = mockDB.venues.find(v => v._id === b.venueId);
      return { ...b, clubId: club, venueId: venue };
    });

    const stats = {
      total: bookings.length,
      approved: bookings.filter((b) => b.status === 'approved').length,
      rejected: bookings.filter((b) => b.status === 'rejected').length,
      pending: bookings.filter((b) => b.status === 'pending').length,
    };

    res.json({
      stats,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings', message: error.message });
  }
};

module.exports = {
  submitBooking,
  getClubBookings,
  getAllBookings,
};
