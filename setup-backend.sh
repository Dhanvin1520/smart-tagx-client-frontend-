#!/bin/bash

echo "🚀 Setting up SmartTagX Backend Authentication System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend-auth
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp config.env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists"
fi

# Go back to root directory
cd ..

echo ""
echo "🎉 Backend setup completed!"
echo ""
echo "Next steps:"
echo "1. Update backend-auth/.env with your configuration"
echo "2. Start MongoDB (local or Atlas)"
echo "3. Run: npm run auth:dev (to start the auth backend)"
echo "4. Run: npm run dev (to start the frontend)"
echo "5. Run: npm run dev:all (to start everything)"
echo ""
echo "Backend will run on: http://localhost:3001"
echo "Frontend will run on: http://localhost:5173"
echo "NLP API will run on: http://localhost:8000"
echo ""
echo "📚 Check backend-auth/README.md for detailed documentation"
