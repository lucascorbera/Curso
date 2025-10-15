@echo off
title 🚀 Setup do Projeto Angular LC PRIME
color 0A
echo ==========================================
echo 🚀 Iniciando setup do projeto Angular LC PRIME
echo ==========================================
echo.

:: Verifica se o Node.js está instalado
echo 🔍 Verificando Node.js...
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js não encontrado. Instale o Node.js antes de continuar:
    echo 👉 https://nodejs.org/
    pause
    exit /b
)
echo ✅ Node.js detectado.
echo.

:: Verifica se o Angular CLI está instalado localmente
echo 🔍 Verificando Angular CLI local...
IF NOT EXIST "node_modules\.bin\ng.cmd" (
    echo ⚙️ Instalando Angular CLI localmente no projeto...
    npm install @angular/cli --save-dev
    IF %ERRORLEVEL% NEQ 0 (
        echo ❌ Falha ao instalar o Angular CLI local.
        pause
        exit /b
    )
    echo ✅ Angular CLI instalado localmente!
) ELSE (
    echo ✅ Angular CLI local já encontrado.
)
echo.

:: Instala dependências do projeto
echo 📦 Instalando dependências principais...
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao instalar dependências do projeto.
    pause
    exit /b
)
echo ✅ Dependências instaladas com sucesso!
echo.

:: Instala bibliotecas de gráficos
echo 📊 Instalando bibliotecas de gráficos (ng2-charts, chart.js, chartjs-plugin-datalabels)...
npm install ng2-charts@latest chart.js chartjs-plugin-datalabels
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao instalar bibliotecas de gráficos.
    pause
    exit /b
)
echo ✅ Bibliotecas de gráficos instaladas com sucesso!
echo.

:: Inicia o JSON Server (se existir o arquivo db.json)
if exist ".\api\db.json" (
    echo ⚙️ Iniciando servidor fake (json-server)...
    start npx json-server --watch ./api/db.json --port 3001
    echo ✅ JSON Server iniciado na porta 3001.
    echo.
) else (
    echo ⚠️ Arquivo db.json não encontrado em ./api/db.json
    echo (Pulando inicialização do JSON Server)
    echo.
)

:: Inicia o servidor Angular usando CLI local
echo 🌐 Iniciando servidor Angular...
npx ng serve

echo.
echo ✅ Setup concluído! Projeto LC PRIME rodando!
pause
