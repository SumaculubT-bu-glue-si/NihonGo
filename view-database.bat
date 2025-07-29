@echo off
echo Opening SQLite database...
echo.
echo Database location: %CD%\nihongo.db
echo.
echo Choose an option:
echo 1. Open with VS Code SQLite extension
echo 2. Open with DB Browser for SQLite (if installed)
echo 3. Open database folder
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo Opening VS Code with SQLite extension...
    code --command "sqlite.openDatabase" "%CD%\nihongo.db"
) else if "%choice%"=="2" (
    echo Opening DB Browser for SQLite...
    start "" "C:\Program Files\DB Browser for SQLite\DB Browser for SQLite.exe" "%CD%\nihongo.db"
) else if "%choice%"=="3" (
    echo Opening database folder...
    explorer "%CD%"
) else (
    echo Invalid choice. Opening folder instead...
    explorer "%CD%"
)

pause 