# Etapa 1: build (compila a aplicação)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

# Copia os arquivos de projeto e restaura dependências
COPY *.csproj ./
RUN dotnet restore

# Copia todo o código fonte
COPY . ./

# Compila em Release
RUN dotnet publish -c Release -o /app/publish

# Etapa 2: runtime (imagem menor)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

# Copia os arquivos publicados da etapa de build
COPY --from=build /app/publish ./

# Expõe a porta que o ASP.NET vai escutar
EXPOSE 5151

# Variável de ambiente para ASP.NET escutar na porta correta em todas as interfaces
ENV ASPNETCORE_URLS=http://+:5151

# Comando para rodar a aplicação
ENTRYPOINT ["dotnet", "JiraProxyApi.dll"]
