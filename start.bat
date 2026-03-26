@echo off
echo Starting SkyID...

start "SkyID Backend" cmd /k "cd /d %~dp0 && call venv\Scripts\activate && cd backend && uvicorn main:app --reload"
timeout /t 2 /nobreak >nul
start "SkyID Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo Both servers started. You can close this window.
