# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/microservices/PatientIdentityMicroservice/PatientIdentityMicroservice.csproj", "microservices/PatientIdentityMicroservice/"]
COPY src/middlewares middlewares/
RUN dotnet restore "microservices/PatientIdentityMicroservice/PatientIdentityMicroservice.csproj"

WORKDIR "/src/microservices/PatientIdentityMicroservice"
COPY src/microservices/PatientIdentityMicroservice .
RUN dotnet build "PatientIdentityMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PatientIdentityMicroservice.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
EXPOSE 443
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PatientIdentityMicroservice.dll"]