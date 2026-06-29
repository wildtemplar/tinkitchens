@echo off
cd /d "%~dp0"
call npm run dev -- --port 5175 --strictPort
