const { mockDB } = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register club
const register = async (req, res) => {
  try {
    const { clubName, email, password, phone, contactPerson } = req.body;

    // Check if club already exists
    const existingClub = mockDB.users.find(u => u.email === email);
    if (existingClub) {
      return res.status(400).json({ error: 'Club already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new club user
    const club = {
      _id: Date.now().toString(),
      clubName,
      email,
      password: hashedPassword,
      phone,
      contactPerson,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockDB.users.push(club);

    // Generate JWT token
    const token = jwt.sign({ clubId: club._id }, process.env.JWT_SECRET || 'test_secret', {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'Club registered successfully',
      token,
      club: { id: club._id, clubName: club.clubName, email: club.email },
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', message: error.message });
  }
};

// Login club
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find club by email
    const club = mockDB.users.find(u => u.email === email);
    if (!club) {
      return res.status(400).json({ error: 'Club not found' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, club.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ clubId: club._id }, process.env.JWT_SECRET || 'test_secret', {
      expiresIn: '7d',
    });

    res.json({
      message: 'Login successful',
      token,
      club: { id: club._id, clubName: club.clubName, email: club.email },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
};

module.exports = { register, login };
