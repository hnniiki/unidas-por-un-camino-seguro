@echo off
title Unidas por un Camino Seguro - Servidor Local
echo ========================================================
echo   Iniciando 'Unidas por un Camino Seguro' localmente...
echo ========================================================
echo.
cd /d "%~dp0"

echo Verificando dependencias...
if not exist node_modules (
    echo Instalando paquetes npm...
    call npm install
)

echo.
echo Iniciando servidor en http://localhost:3000 ...
echo Presiona Ctrl + C en esta ventana para detener el servidor.
echo.
start http://localhost:3000
call npm run dev
pause

