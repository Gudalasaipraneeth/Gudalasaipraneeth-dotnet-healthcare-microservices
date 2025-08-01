# Contributing to Healthcare Management Platform

Thank you for your interest in contributing to our healthcare management platform! This document provides guidelines for contributing to this project.

## 🏥 Healthcare Domain Considerations

This project deals with healthcare data and must comply with relevant regulations:
- Follow HIPAA guidelines for patient data handling
- Ensure all PHI (Protected Health Information) is properly secured
- Use appropriate encryption for sensitive data

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- MongoDB 4.4+
- Docker (for containerized development)
- Visual Studio or VS Code

### Setting up Development Environment

1. Clone the repository
```bash
git clone https://github.com/Gudalasaipraneeth/Gudalasaipraneeth-dotnet-healthcare-microservices.git
cd Gudalasaipraneeth-dotnet-healthcare-microservices
```

2. Start dependencies
```bash
docker-compose up -d mongodb
```

3. Run the services
```bash
# Terminal 1: Medical Services
cd src/microservices/MedicalServicesMicroservice
dotnet run

# Terminal 2: Appointment Service
cd src/microservices/AppointmentMicroservice
dotnet run

# Terminal 3: Patient Identity Service
cd src/microservices/PatientIdentityMicroservice
dotnet run
```

## 📝 Code Style Guidelines

### C# Conventions
- Follow Microsoft C# coding conventions
- Use PascalCase for public members
- Use camelCase for private fields
- Add XML documentation for public APIs

### Healthcare-Specific Naming
- Use medical terminology consistently
- Prefix patient-related classes with `Patient`
- Use `Medical` prefix for service-related entities
- Follow healthcare industry standards for field names

## 🧪 Testing

### Unit Tests
- Write unit tests for all new features
- Maintain at least 80% code coverage
- Use healthcare-specific test data that doesn't contain real PHI

### Integration Tests
- Test microservice interactions
- Validate API contracts
- Test database operations with healthcare scenarios

## 🔒 Security Guidelines

### Data Protection
- Never commit real patient data
- Use anonymized test data only
- Implement proper input validation
- Follow OWASP security guidelines

### Authentication & Authorization
- Implement role-based access control
- Use secure JWT token handling
- Validate user permissions for healthcare operations

## 📋 Contribution Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/appointment-reminders
   ```

3. **Make your changes**
   - Follow coding standards
   - Write tests
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "feat: Add appointment reminder system"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/appointment-reminders
   ```

6. **Create a Pull Request**

## 🏷️ Commit Message Format

Use conventional commits format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test additions/changes
- `refactor:` for code refactoring
- `chore:` for maintenance tasks

Examples:
- `feat: Add patient appointment scheduling`
- `fix: Resolve appointment conflict detection`
- `docs: Update API documentation for medical services`

## 🚨 Issue Reporting

When reporting issues:
- Use the issue templates
- Provide clear reproduction steps
- Include relevant logs (sanitized of PHI)
- Specify the affected microservice

## 📞 Getting Help

- Open an issue for bugs or feature requests
- Join our discussions for general questions
- Review existing documentation and code examples

## 🤝 Code Review Process

All contributions require code review:
- At least one approval from a maintainer
- All tests must pass
- Code coverage requirements must be met
- Security review for healthcare-related changes

Thank you for contributing to healthcare technology! 🏥
