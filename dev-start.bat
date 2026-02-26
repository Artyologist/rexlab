@echo off
echo Starting Rex Labs server and client...
start "RexLabs Server" cmd /k "cd server && npm run dev"
start "RexLabs Client" cmd /k "cd client && npm run dev"
echo Done. Check the new windows.
