const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClubUser',
      required: true,
    },
    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      enum: ['9-11', '11-1', '2-4', '4-6'],
      required: true,
    },
    eventDescription: String,
    attendees: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    conflictReason: String, // Reason for rejection if any
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
