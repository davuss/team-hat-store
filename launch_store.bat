@echo off
REM ============================================================
REM  Team HAT Cardhouse — 1-Click Dev Server Launcher
REM  PROMPT-01: Windows batch launcher for Chloe
REM  Double-click this file to start the store locally.
REM ============================================================

title Team HAT Cardhouse — Dev Server

echo.
echo  ████████╗███████╗ █████╗ ███╗   ███╗    ██╗  ██╗ █████╗ ████████╗
echo  ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║    ██║  ██║██╔══██╗╚══██╔══╝
echo     ██║   █████╗  ███████║██╔████╔██║    ███████║███████║   ██║
echo     ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║    ██╔══██║██╔══██║   ██║
echo     ██║   ███████╗██║  ██║██║ ╚═╝ ██║    ██║  ██║██║  ██║   ██║
echo     ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
echo.
echo  ============================================================
echo   Team HAT Cardhouse — Local Dev Server
echo   URL: http://localhost:3000
echo  ============================================================
echo.

REM Navigate to the project directory (same folder as this script)
cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules\" (
    echo  [!] node_modules not found. Running npm install first...
    echo.
    call npm install
    echo.
)

REM Check if database exists; if not, push schema and seed
if not exist "prisma\dev.db" (
    echo  [!] Database not found. Setting up database...
    echo.
    call npx prisma db push
    echo.
    echo  [!] Seeding database with sample inventory...
    echo.
    call npm run db:seed
    echo.
)

echo  [✓] Starting Next.js dev server...
echo  [✓] The store will open in your browser in 3 seconds.
echo.
echo  Press Ctrl+C in this window to stop the server.
echo  ============================================================
echo.

REM Open browser after 3-second delay (runs in background)
start "" cmd /c "timeout /t 3 /nobreak > nul && start http://localhost:3000"

REM Start the dev server (blocks until Ctrl+C)
npm run dev

pause
