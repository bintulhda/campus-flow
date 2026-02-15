import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './BookingForm.css';

function BookingForm() {
  const [venues, setVenues] = useState([]);
  const [venueId, setVenueId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('9-11');
  const [eventDescription, setEventDescription] = useState('');
  const [attendees, setAttendees] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await api.getVenues();
      setVenues(response.venues);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await api.submitBooking({
        venueId,
        date: new Date(date).toISOString(),
        timeSlot,
        eventDescription,
        attendees: parseInt(attendees),
      });

      setMessageType(response.booking.status === 'approved' ? 'success' : 'error');
      setMessage(response.message);

      // Reset form
      setVenueId('');
      setDate('');
      setTimeSlot('9-11');
      setEventDescription('');
      setAttendees('');
    } catch (error) {
      setMessageType('error');
      setMessage(error.response?.data?.error || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="booking-form-wrapper">
        <h1>📅 Book a Venue</h1>

        {message && (
          <div className={`alert alert-${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Select Venue *</label>
            <select
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
              required
            >
              <option value="">-- Choose a venue --</option>
              {venues.map((venue) => (
                <option key={venue._id} value={venue._id}>
                  {venue.name} (Capacity: {venue.capacity})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Event Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Time Slot *</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="9-11">9:00 AM - 11:00 AM</option>
              <option value="11-1">11:00 AM - 1:00 PM</option>
              <option value="2-4">2:00 PM - 4:00 PM</option>
              <option value="4-6">4:00 PM - 6:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Expected Attendees *</label>
            <input
              type="number"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
              required
              min="1"
              placeholder="Number of people"
            />
          </div>

          <div className="form-group">
            <label>Event Description</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Describe your event..."
              rows="4"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : '🚀 Submit Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
