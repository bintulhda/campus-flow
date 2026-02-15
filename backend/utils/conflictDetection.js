const Booking = require('../models/Booking');

/**
 * Check if a booking conflicts with existing bookings
 * CONFLICT LOGIC:
 * IF venue_id == same AND date == same AND time_slot == same
 *   → Return TRUE (conflict exists)
 * ELSE
 *   → Return FALSE (no conflict)
 */
const checkConflict = async (venueId, date, timeSlot) => {
  try {
    // Normalize date to start of day for comparison
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Query for approved/pending bookings with same venue, date, and time slot
    const conflictingBooking = await Booking.findOne({
      venueId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      timeSlot,
      status: { $in: ['approved', 'pending'] }, // Check against approved and pending
    });

    return conflictingBooking ? true : false;
  } catch (error) {
    console.error('Error in conflict detection:', error);
    throw error;
  }
};

module.exports = { checkConflict };
