import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.getClubBookings();
      setBookings(response.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    return `status-badge status-${status}`;
  };

  return (
    <div className="container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1>📊 Your Bookings</h1>
          <button
            className="btn btn-success"
            onClick={() => navigate('/booking')}
          >
            + New Booking
          </button>
        </div>

        {loading ? (
          <p className="loading">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <h2>😴 No bookings yet</h2>
            <p>Create your first booking request!</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/booking')}
            >
              Book a Venue
            </button>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.venueId?.name}</h3>
                  <span className={getStatusBadgeClass(booking.status)}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>

                <div className="booking-details">
                  <p>
                    <strong>Date:</strong> {new Date(booking.date).toDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {booking.timeSlot}
                  </p>
                  <p>
                    <strong>Attendees:</strong> {booking.attendees}
                  </p>
                  {booking.eventDescription && (
                    <p>
                      <strong>Description:</strong> {booking.eventDescription}
                    </p>
                  )}
                  {booking.conflictReason && (
                    <p className="conflict-reason">
                      <strong>❌ Reason:</strong> {booking.conflictReason}
                    </p>
                  )}
                  <p className="booking-date">
                    Requested: {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
