#!/bin/bash

echo "🤖 AI Feature Manager - Quick Start"
echo "===================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found!"
    echo ""
    echo "Please follow these steps:"
    echo "1. Copy .env.local.example to .env.local"
    echo "2. Add your OpenAI API key to .env.local"
    echo "3. Run this script again"
    echo ""
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Starting development server..."
echo "Open http://localhost:3000 in your browser"
echo ""

npm run dev
