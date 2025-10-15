@echo off
echo 🚀 Iniciando setup do projeto Angular...
echo 📦 Instalando dependencias...
npm install

IF %ERRORLEVEL% NEQ 0 (
  echo ❌ Erro ao instalar dependencias.
  exit /b %ERRORLEVEL%
)

echo ✅ Dependencias instaladas com sucesso!
echo ⚙️ Iniciando servidor fake (json-server)...
start npx json-server --watch ./api/db.json --port 3001

echo 🌐 Iniciando servidor Angular...
npm start
