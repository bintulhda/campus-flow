import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <div className="landing-content">
          <h1 className="landing-title">CampusFlow</h1>
          <p className="landing-subtitle">Smart Venue Booking for Campus Clubs</p>
          
          <div className="landing-description">
            <p>Manage your club's venue bookings effortlessly. Schedule events, avoid conflicts, and keep everyone organized.</p>
          </div>

          <div className="landing-features">
            <div className="feature">
              <span className="feature-icon">📅</span>
              <h3>Smart Scheduling</h3>
              <p>Avoid booking conflicts with real-time availability</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <h3>Easy Management</h3>
              <p>Manage all your club events in one place</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🚀</span>
              <h3>Fast & Simple</h3>
              <p>Book venues in seconds, no hassle</p>
            </div>
          </div>

          <div className="landing-cta">
            <button className="btn-primary-lg" onClick={() => navigate('/login')}>
              Sign In
            </button>
            <button className="btn-secondary-lg" onClick={() => navigate('/register')}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
