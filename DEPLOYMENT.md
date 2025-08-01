# 🚀 Deployment Guide

This guide provides instructions for deploying the Healthcare Management Platform in various environments.

## 📋 Prerequisites

- Docker and Docker Compose
- .NET 8.0 SDK (for local development)
- MongoDB 4.4+ (or MongoDB Atlas for cloud)
- Kubernetes cluster (for production deployment)

## 🐳 Docker Deployment

### Quick Start with Docker Compose

1. **Clone the repository**
```bash
git clone https://github.com/Gudalasaipraneeth/Gudalasaipraneeth-dotnet-healthcare-microservices.git
cd Gudalasaipraneeth-dotnet-healthcare-microservices
```

2. **Start all services**
```bash
docker-compose up -d
```

3. **Verify deployment**
```bash
docker-compose ps
```

### Environment-Specific Deployments

#### Development Environment
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

#### Production Environment
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🏥 Healthcare Compliance Considerations

### Data Security
- Ensure MongoDB is configured with authentication
- Use TLS/SSL for all communications
- Implement proper network segmentation
- Regular security audits and penetration testing

### HIPAA Compliance
- Configure audit logging for all patient data access
- Implement data encryption at rest and in transit
- Set up proper backup and disaster recovery
- Maintain access logs for compliance reporting

## ☁️ Cloud Deployment

### Azure Container Instances
```bash
# Create resource group
az group create --name healthcare-rg --location eastus

# Deploy containers
az container create \
  --resource-group healthcare-rg \
  --name healthcare-platform \
  --image your-registry/healthcare-platform:latest \
  --cpu 2 --memory 4
```

### AWS ECS
```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name healthcare-platform

# Create task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service \
  --cluster healthcare-platform \
  --service-name healthcare-service \
  --task-definition healthcare-task
```

## 🔧 Configuration

### Environment Variables

#### Medical Services Microservice
```env
MONGODB_CONNECTION_STRING=mongodb://localhost:27017
DATABASE_NAME=HealthcareDB
JWT_SECRET=your-secure-jwt-secret
ASPNETCORE_ENVIRONMENT=Production
```

#### Patient Identity Microservice
```env
MONGODB_CONNECTION_STRING=mongodb://localhost:27017
DATABASE_NAME=IdentityDB
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRY_HOURS=24
```

#### Appointment Microservice
```env
MONGODB_CONNECTION_STRING=mongodb://localhost:27017
DATABASE_NAME=AppointmentDB
NOTIFICATION_SERVICE_URL=http://notification-service:5000
```

### Database Setup

#### MongoDB Initialization
```javascript
// Initialize databases
use HealthcareDB
db.createCollection("medicalServices")
db.medicalServices.createIndex({ "department": 1 })
db.medicalServices.createIndex({ "doctorId": 1 })

use IdentityDB
db.createCollection("users")
db.users.createIndex({ "email": 1 }, { unique: true })

use AppointmentDB
db.createCollection("appointments")
db.appointments.createIndex({ "patientId": 1 })
db.appointments.createIndex({ "doctorId": 1 })
db.appointments.createIndex({ "scheduledDateTime": 1 })
```

## 🔍 Monitoring and Logging

### Health Checks
```bash
# Check service health
curl http://localhost:5001/health
curl http://localhost:5002/health
curl http://localhost:5003/health
```

### Log Aggregation
```yaml
# docker-compose.logging.yml
version: '3.8'
services:
  medical-services:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Metrics Collection
```bash
# Prometheus configuration
docker run -d \
  --name prometheus \
  -p 9090:9090 \
  -v ./prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
```

## 🚨 Troubleshooting

### Common Issues

#### MongoDB Connection Issues
```bash
# Check MongoDB status
docker logs mongodb

# Test connection
mongo --host localhost:27017 --eval "db.adminCommand('ismaster')"
```

#### Service Discovery Issues
```bash
# Check Docker network
docker network ls
docker network inspect healthcare-network

# Check service logs
docker-compose logs medical-services
docker-compose logs appointment-service
docker-compose logs patient-identity
```

#### Memory Issues
```bash
# Monitor resource usage
docker stats

# Increase memory limits in docker-compose.yml
services:
  medical-services:
    deploy:
      resources:
        limits:
          memory: 1G
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy Healthcare Platform

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Build Docker images
      run: docker-compose build
    
    - name: Run tests
      run: docker-compose run --rm test
    
    - name: Deploy to staging
      run: docker-compose -f docker-compose.staging.yml up -d
```

## 📊 Performance Optimization

### Database Optimization
- Implement proper indexing for frequently queried fields
- Use MongoDB aggregation pipelines for complex queries
- Consider read replicas for high-traffic scenarios

### Caching Strategy
- Implement Redis for session management
- Cache frequently accessed medical service data
- Use CDN for static frontend assets

### Load Balancing
```nginx
# nginx.conf
upstream medical-services {
    server medical-service-1:5001;
    server medical-service-2:5001;
    server medical-service-3:5001;
}

server {
    listen 80;
    location /api/medicalservices {
        proxy_pass http://medical-services;
    }
}
```

## 🔒 Security Hardening

### Network Security
- Use private Docker networks
- Implement API rate limiting
- Configure proper firewall rules
- Use VPN for administrative access

### Application Security
- Implement proper input validation
- Use parameterized queries
- Regular dependency updates
- Security headers configuration

## 📞 Support

For deployment issues:
- Check the troubleshooting section
- Review application logs
- Open an issue with deployment details
- Contact the development team

---
*This deployment guide ensures secure, scalable, and compliant deployment of the Healthcare Management Platform.*
