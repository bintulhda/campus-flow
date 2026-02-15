#!/bin/bash

# CampusFlow - Quick Start Script (Linux/Mac)

echo "🚀 Starting CampusFlow Setup..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed. Please install Node.js v14+"
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"

# Backend Setup
echo ""
echo "📦 Setting up Backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Frontend Setup
echo ""
echo "🎨 Setting up Frontend..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "   1. Configure .env file in backend folder"
echo "   2. Start MongoDB: mongod (or use MongoDB Atlas)"
echo "   3. Seed database: cd backend && npm run seed"
echo "   4. Terminal 1: cd backend && npm run dev (port 5000)"
echo "   5. Terminal 2: cd frontend && npm run dev (port 3000)"
echo ""
echo "🌐 Open http://localhost:3000 in your browser"
