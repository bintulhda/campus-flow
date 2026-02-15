import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingForm from './pages/BookingForm';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clubName, setClubName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedClubName = localStorage.getItem('clubName');
    if (token) {
      setIsAuthenticated(true);
      setClubName(storedClubName);
    }
  }, []);

  const handleLogin = (token, name) => {
    localStorage.setItem('token', token);
    localStorage.setItem('clubName', name);
    setIsAuthenticated(true);
    setClubName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('clubName');
    setIsAuthenticated(false);
    setClubName('');
  };

  return (
    <Router>
      {isAuthenticated && <Navbar clubName={clubName} onLogout={handleLogout} />}
      <Routes>
        {/* Landing Page - Entry point for all users */}
        <Route path="/" element={<Landing />} />

        {/* Authentication Routes - Only accessible when not authenticated */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register onRegister={handleLogin} /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Routes - Only accessible when authenticated */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/booking"
          element={isAuthenticated ? <BookingForm /> : <Navigate to="/login" />}
        />

        {/* Catch all - redirect unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
