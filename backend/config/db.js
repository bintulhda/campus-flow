const bcrypt = require('bcryptjs');

// In-memory mock database
const mockDB = {
  users: [],
  bookings: [],
  venues: []
};

// Initialize with dummy data
const initializeMockDB = async () => {
  try {
    // Hash passwords for dummy users
    const password1 = await bcrypt.hash('password123', 10);
    const password2 = await bcrypt.hash('password456', 10);

    // Create dummy users
    mockDB.users = [
      {
        _id: '1',
        clubName: 'Drama Society',
        email: 'drama@campus.edu',
        password: password1,
        phone: '555-0001',
        contactPerson: 'Alice Johnson',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        clubName: 'Photography Club',
        email: 'photo@campus.edu',
        password: password2,
        phone: '555-0002',
        contactPerson: 'Bob Smith',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Create dummy venues
    mockDB.venues = [
      {
        _id: '101',
        name: 'Auditorium A',
        capacity: 500,
        amenities: ['Projector', 'Sound System', 'Stage'],
        availableSlots: ['10:00', '14:00', '18:00'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '102',
        name: 'Conference Room B',
        capacity: 50,
        amenities: ['WiFi', 'Whiteboard', 'AC'],
        availableSlots: ['09:00', '13:00', '16:00'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Create dummy bookings
    mockDB.bookings = [
      {
        _id: '201',
        clubId: '1',
        venueId: '101',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        timeSlot: '18:00',
        attendees: 200,
        eventDescription: 'Annual Drama Performance',
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '202',
        clubId: '2',
        venueId: '102',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        timeSlot: '14:00',
        attendees: 30,
        eventDescription: 'Photography Exhibition Setup',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    console.log('✅ Mock Database initialized with dummy data');
  } catch (error) {
    console.error('❌ Mock database initialization failed:', error.message);
  }
};

const connectDB = async () => {
  await initializeMockDB();
};

module.exports = { connectDB, mockDB };
