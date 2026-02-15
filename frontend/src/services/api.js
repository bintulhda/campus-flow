import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Register club
export const registerClub = async (clubData) => {
  const response = await axios.post(`${API_BASE}/auth/register`, clubData);
  return response.data;
};

// Login club
export const loginClub = async (credentials) => {
  const response = await axios.post(`${API_BASE}/auth/login`, credentials);
  return response.data;
};

// Get all venues
export const getVenues = async () => {
  const response = await axios.get(`${API_BASE}/venues`);
  return response.data;
};

// Get single venue
export const getVenueById = async (id) => {
  const response = await axios.get(`${API_BASE}/venues/${id}`);
  return response.data;
};

// Submit booking
export const submitBooking = async (bookingData) => {
  const response = await axios.post(`${API_BASE}/bookings`, bookingData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

// Get club bookings
export const getClubBookings = async () => {
  const response = await axios.get(`${API_BASE}/bookings/my-bookings`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

// Get all bookings (admin)
export const getAllBookings = async () => {
  const response = await axios.get(`${API_BASE}/bookings`);
  return response.data;
};

export default {
  registerClub,
  loginClub,
  getVenues,
  getVenueById,
  submitBooking,
  getClubBookings,
  getAllBookings,
};
