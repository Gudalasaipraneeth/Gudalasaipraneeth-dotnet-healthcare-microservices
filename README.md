
# Healthcare Management Platform

This project is a simple healthcare management system using microservices.

## Features
- Medical Services
- Patient Identity
- Appointment Scheduling

## How to Run

**Requirements:**
- .NET 8.0 SDK
- MongoDB 4.4 or newer
- Docker (optional)

**Steps:**
1. Clone the repository:
   ```bash
   git clone https://github.com/Gudalasaipraneeth/Gudalasaipraneeth-dotnet-healthcare-microservices.git
   cd Gudalasaipraneeth-dotnet-healthcare-microservices
   ```
2. Start MongoDB:
   ```bash
   docker run -d -p 27017:27017 mongo
   ```
3. Run each service in a separate terminal:
   ```bash
   cd src/microservices/MedicalServicesMicroservice
   dotnet run
   # In another terminal
   cd src/microservices/AppointmentMicroservice
   dotnet run
   # In another terminal
   cd src/microservices/PatientIdentityMicroservice
   dotnet run
   ```

## API Endpoints

**Medical Services**
- `GET /api/medicalservices` - List all
- `POST /api/medicalservices` - Add new

**Appointments**
- `GET /api/appointment?patientId={id}` - List for patient
- `POST /api/appointment` - Schedule

**Patient Identity**
- `POST /api/patientidentity/register-patient` - Register
- `GET /api/patientidentity/profile/{userId}` - Get profile

## Testing

To run all tests:
```bash
dotnet test
```

## Contact

For questions, open an issue on GitHub.

## 🚀 Quick Start

### Prerequisites
- .NET 8.0 SDK
- MongoDB 4.4+
- Docker (optional)

### Development Setup
```bash
# Clone the repository
git clone https://github.com/Gudalasaipraneeth/Gudalasaipraneeth-dotnet-healthcare-microservices.git
cd Gudalasaipraneeth-dotnet-healthcare-microservices


# Healthcare Management Platform

This project demonstrates hands-on experience in building a modern, secure, and scalable healthcare management system using microservices architecture.

## Key Skills & Technologies

- **.NET 8 Microservices**: Designed and implemented independent services for medical, appointment, and identity management.
- **Docker & Containerization**: All services are containerized for local and cloud deployment. Includes Docker Compose orchestration.
- **MongoDB Integration**: Used for storing patient, appointment, and service data with healthcare-specific schema design.
- **API Gateway (Ocelot)**: Centralized routing, authentication, and rate limiting for all APIs.
- **CI/CD**: Automated build, test, and deployment pipelines (sample GitHub Actions workflow included).
- **Unit & Integration Testing**: Comprehensive test coverage using xUnit and integration test projects for each microservice.
- **Security & Compliance**: JWT authentication, role-based access control, and HIPAA-inspired data handling practices.
- **Documentation**: Detailed API, deployment, and security documentation. Follows best practices for open source projects.

## Features Delivered

- Medical Services CRUD
- Patient registration and role management
- Appointment scheduling with conflict detection
- Role-based authentication for patients and staff
- Real-time notifications (planned)
- Medical record and prescription management (planned)

## How to Run Locally

**Requirements:**
- .NET 8.0 SDK
- MongoDB 4.4+
- Docker (for containers)

**Steps:**
1. Clone the repository:
   ```bash
   git clone https://github.com/Gudalasaipraneeth/Gudalasaipraneeth-dotnet-healthcare-microservices.git
   cd Gudalasaipraneeth-dotnet-healthcare-microservices
   ```
2. Start MongoDB:
   ```bash
   docker run -d -p 27017:27017 mongo
   ```
3. Run each service in a separate terminal:
   ```bash
   cd src/microservices/MedicalServicesMicroservice && dotnet run
   cd src/microservices/AppointmentMicroservice && dotnet run
   cd src/microservices/PatientIdentityMicroservice && dotnet run
   ```
4. Or use Docker Compose:
   ```bash
   docker-compose up --build
   ```

## API Overview

- Medical Services: `/api/medicalservices`
- Appointments: `/api/appointment`
- Patient Identity: `/api/patientidentity`

## Testing & Quality

- Run all tests:
  ```bash
  dotnet test
  ```
- Each microservice has its own test project for unit and integration tests.

## DevOps & CI/CD

- Sample GitHub Actions workflow for build, test, and deploy automation
- Docker Compose for local orchestration
- Environment variable support for secrets and configuration

## Security & Compliance

- JWT authentication and role-based authorization
- Secure handling of patient data (no real PHI in dev)
- HIPAA-inspired logging and audit trails
- Rate limiting and API gateway security

## Documentation

- API docs: See `API.md`
- Deployment: See `DEPLOYMENT.md`
- Security: See `SECURITY.md`
- Contribution guide: See `CONTRIBUTING.md`

## Contact

For questions or collaboration, open an issue or pull request on GitHub.
- Added role-based authentication for healthcare workers

### Technical Debt
- [ ] Update unit tests for healthcare scenarios
- [ ] Implement proper logging for healthcare compliance

## 🧪 Testing

```bash
# Run unit tests
dotnet test

# Run specific microservice tests
cd tests/MedicalServicesMicroservice.UnitTests
dotnet test
```

## 📝 API Documentation

### Medical Services API
- `GET /api/medicalservices` - List all services
- `GET /api/medicalservices/department/{dept}` - Services by department
- `POST /api/medicalservices` - Create new service
- `PUT /api/medicalservices` - Update service

### Appointment API
- `GET /api/appointment?patientId={id}` - Patient appointments
- `GET /api/appointment/doctor?doctorId={id}&date={date}` - Doctor schedule
- `POST /api/appointment` - Schedule appointment
- `PUT /api/appointment/status` - Update appointment status

### Patient Identity API
- `POST /api/patientidentity/register-patient` - Register patient
- `POST /api/patientidentity/register-medical-staff` - Register staff
- `GET /api/patientidentity/profile/{userId}` - Get user profile

## 🚨 Known Issues
- [ ] Appointment overlap validation needs refinement
- [ ] MongoDB connection string configuration
- [ ] JWT token expiration handling
- [ ] Docker compose service dependencies


## 📈 Progress Tracking

**Week 1:** ✅ Basic microservices transformation  
**Week 2:** ✅ Healthcare domain modeling  
**Week 3:** ✅ Advanced scheduling features  
**Week 4:** ✅ Dashboard and reporting  

## � API Reference

### Medical Services API
- `GET /api/medicalservices` - List all services
- `GET /api/medicalservices/{id}` - Get service by ID
- `GET /api/medicalservices/department/{dept}` - Services by department
- `POST /api/medicalservices` - Create new service
- `PUT /api/medicalservices/{id}` - Update service
- `DELETE /api/medicalservices/{id}` - Delete service

### Appointment API
- `GET /api/appointment?patientId={id}` - Patient appointments
- `GET /api/appointment/doctor?doctorId={id}&date={date}` - Doctor schedule
- `POST /api/appointment` - Schedule appointment
- `PUT /api/appointment/status` - Update appointment status
- `DELETE /api/appointment/{id}` - Cancel appointment

### Patient Identity API
- `POST /api/patientidentity/register-patient` - Register patient
- `POST /api/patientidentity/register-medical-staff` - Register staff
- `POST /api/patientidentity/login` - Login
- `GET /api/patientidentity/profile/{userId}` - Get user profile
- `PUT /api/patientidentity/profile` - Update profile
- `DELETE /api/patientidentity/{userId}` - Delete user

### Admin & Utility APIs
- `GET /api/health` - Service health check
- `GET /api/audit/logs` - View audit logs (admin)
- `POST /api/notifications/send` - Send notification (admin)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is an active development project. Current focus areas:
1. Appointment scheduling optimization
2. Healthcare compliance features
3. Integration testing
4. Documentation improvements
   
*This project demonstrates modern microservices architecture applied to healthcare management systems.*
