@echo off
REM AI Feature Manager - Quick Start for Windows

echo 🤖 AI Feature Manager - Quick Start
echo ====================================
echo.

REM Check if .env.local exists
if not exist ".env.local" (
    echo ❌ .env.local not found!
    echo.
    echo Please follow these steps:
    echo 1. Copy .env.local.example to .env.local
    echo 2. Add your OpenAI API key to .env.local
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
)

echo.
echo ✅ Setup complete!
echo.
echo Starting development server...
echo Open http://localhost:3000 in your browser
echo.

call npm run dev
