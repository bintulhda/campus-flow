@echo off
REM CampusFlow - Quick Start Script (Windows)

echo.
echo 🚀 Starting CampusFlow Setup...
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not installed. Please install Node.js v14+
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js detected: %NODE_VERSION%
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend setup failed
    cd ..
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed
cd ..

REM Frontend Setup
echo.
echo 🎨 Setting up Frontend...
cd frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend setup failed
    cd ..
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
cd ..

echo.
echo 🎉 Setup Complete!
echo.
echo 📝 Next Steps:
echo    1. Configure backend\.env file (copy from .env.example)
echo    2. Start MongoDB: mongod (or use MongoDB Atlas)
echo    3. Terminal 1: cd backend ^&^& npm run seed
echo    4. Terminal 2: cd backend ^&^& npm run dev (port 5000)
echo    5. Terminal 3: cd frontend ^&^& npm run dev (port 3000)
echo.
echo 🌐 Open http://localhost:3000 in your browser
echo.
echo Press any key to continue...
pause
