const mongoose = require('mongoose');
require('dotenv').config();
const Venue = require('./models/Venue');
const ClubUser = require('./models/ClubUser');

const venues = [
  {
    name: 'Seminar Hall A',
    capacity: 100,
    location: 'Building 1, Ground Floor',
    description: 'Perfect for seminars and workshops',
    amenities: ['Projector', 'Whiteboard', 'AC', 'WiFi'],
  },
  {
    name: 'Seminar Hall B',
    capacity: 80,
    location: 'Building 2, First Floor',
    description: 'Ideal for group discussions',
    amenities: ['Projector', 'WiFi', 'Sound System'],
  },
  {
    name: 'Conference Room',
    capacity: 50,
    location: 'Admin Block',
    description: 'Executive meeting space',
    amenities: ['Whiteboard', 'WiFi', 'Coffee Station'],
  },
  {
    name: 'Main Auditorium',
    capacity: 300,
    location: 'Main Hall',
    description: 'Large events and presentations',
    amenities: ['Projector', 'Sound System', 'Stage', 'WiFi'],
  },
  {
    name: 'Mini Auditorium',
    capacity: 150,
    location: 'Cultural Building',
    description: 'Cultural events and performances',
    amenities: ['Sound System', 'Stage', 'Lighting'],
  },
  {
    name: 'Lab A',
    capacity: 40,
    location: 'Tech Building',
    description: 'Technical demonstrations',
    amenities: ['Equipment', 'WiFi', 'Power Outlets'],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing venues
    await Venue.deleteMany({});
    console.log('🗑️  Cleared existing venues');

    // Insert venues
    await Venue.insertMany(venues);
    console.log('✅ Venues seeded successfully');

    console.log('\n📊 Venues Added:');
    venues.forEach((v, i) => {
      console.log(`   ${i + 1}. ${v.name} (Capacity: ${v.capacity})`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
