# Imagem base leve do Node
FROM node:22-alpine

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (melhor cache)
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm install --only=production

# Copia o restante do código
COPY . .

# Expõe a porta do servidor
EXPOSE 3000

# Comando padrão para iniciar o app
CMD ["npm", "start"]
