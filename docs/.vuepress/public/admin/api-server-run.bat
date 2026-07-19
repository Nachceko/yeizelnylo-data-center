@echo off
chcp 65001 >nul
cls

echo.
echo ========================================
echo    Local File API Server
echo ========================================
echo.

echo [1/2] Checking Node.js environment...
echo.

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo  ERROR: Node.js not found!
    echo.
    echo  Please install Node.js: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo  [OK] Node.js installed, version: %NODE_VERSION%
echo.

timeout /t 2 /nobreak >nul

echo [2/2] Starting API server...
echo.

timeout /t 2 /nobreak >nul

cls
echo.
echo ========================================
echo    Local File API Server
echo ========================================
echo.
echo    Starting service...
echo.
echo    Server will run on:
echo    http://localhost:3001
echo.
echo ========================================
echo.

timeout /t 2 /nobreak >nul

node "%~dp0api-server.js"

pause