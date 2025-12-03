require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Item = require('../models/Item');

async function seed() {
  await connectDB(process.env.MONGO_URI);

  // Clear existing data
  await User.deleteMany({});
  await Item.deleteMany({});

  // Create admin
  const admin = new User({
    username: 'admin',
    displayName: 'Main Admin',
    role: 'admin'
  });
  await admin.setPassword('admin123'); // IMPORTANT: Change password later
  await admin.save();

  // Create staff user
  const staff = new User({
    username: 'staff1',
    displayName: 'Staff Member',
    role: 'creator'
  });
  await staff.setPassword('staff123');
  await staff.save();

  // Sample inventory items
  const sampleItems = [
    { itemId: 'TV-001', name: 'Smart LED TV 42"', category: 'TV', brand: 'SuperView', price: 29999, quantity: 10, threshold: 5 },
    { itemId: 'FR-001', name: 'Double Door Refrigerator 300L', category: 'Fridge', brand: 'CoolHome', price: 25999, quantity: 4, threshold: 5 },
    { itemId: 'AC-001', name: '1.5 Ton Inverter AC', category: 'AC', brand: 'BreezeX', price: 34999, quantity: 2, threshold: 3 },
    { itemId: 'WM-001', name: 'Front Load Washing Machine', category: 'Washing Machine', brand: 'SpinPro', price: 22999, quantity: 6, threshold: 4 }
  ];

  for (const s of sampleItems) {
    const item = new Item(s);
    await item.save();
  }

  console.log('\n🌱 Database Seed Complete!');
  console.log('👉 Admin Login: admin / admin123');
  console.log('👉 Staff Login: staff1 / staff123');

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
