#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ConsultaFilmes.API/ConsultaFilmes.API.csproj", "ConsultaFilmes.API/"]
COPY ["ConsultaFilmes.Domain/ConsultaFilmes.Domain.csproj", "ConsultaFilmes.Domain/"]
COPY ["ConsultaFilmes.Repository/ConsultaFilmes.Repository.csproj", "ConsultaFilmes.Repository/"]
COPY ["ConsultaFilmes.Service/ConsultaFilmes.Service.csproj", "ConsultaFilmes.Service/"]
RUN dotnet restore "./ConsultaFilmes.API/ConsultaFilmes.API.csproj"
COPY . .
WORKDIR "/src/ConsultaFilmes.API"
RUN dotnet build "./ConsultaFilmes.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ConsultaFilmes.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ConsultaFilmes.API.dll"]