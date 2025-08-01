# 📋 API Documentation

This document provides detailed API documentation for the Healthcare Management Platform microservices.

## 🏥 Medical Services API

**Base URL:** `http://localhost:5001/api/medicalservices`

### Endpoints

#### Get All Medical Services
```http
GET /api/medicalservices
```

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "serviceName": "General Consultation",
    "department": "General Medicine",
    "cost": 150.00,
    "durationMinutes": 30,
    "doctorId": "507f1f77bcf86cd799439012",
    "isEmergencyService": false,
    "description": "Basic medical consultation",
    "requirements": ["Valid ID", "Insurance Card"]
  }
]
```

#### Get Services by Department
```http
GET /api/medicalservices/department/{departmentName}
```

**Parameters:**
- `departmentName` (string): Department name (e.g., "Cardiology", "Pediatrics")

#### Create Medical Service
```http
POST /api/medicalservices
Content-Type: application/json
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "serviceName": "Cardiac Consultation",
  "department": "Cardiology",
  "cost": 300.00,
  "durationMinutes": 45,
  "doctorId": "507f1f77bcf86cd799439013",
  "isEmergencyService": false,
  "description": "Specialized cardiac examination",
  "requirements": ["ECG Report", "Previous Medical Records"]
}
```

#### Update Medical Service
```http
PUT /api/medicalservices/{id}
Content-Type: application/json
Authorization: Bearer {jwt-token}
```

#### Delete Medical Service
```http
DELETE /api/medicalservices/{id}
Authorization: Bearer {jwt-token}
```

---

## 📅 Appointment API

**Base URL:** `http://localhost:5002/api/appointment`

### Endpoints

#### Get Patient Appointments
```http
GET /api/appointment?patientId={patientId}
```

**Parameters:**
- `patientId` (string): Patient's unique identifier

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439014",
    "serviceId": "507f1f77bcf86cd799439011",
    "patientId": "507f1f77bcf86cd799439015",
    "doctorId": "507f1f77bcf86cd799439012",
    "scheduledDateTime": "2024-01-15T10:00:00Z",
    "status": "Scheduled",
    "patientNotes": "Experiencing chest pain",
    "doctorNotes": "",
    "estimatedDuration": 30,
    "appointmentType": "Consultation"
  }
]
```

#### Get Doctor Schedule
```http
GET /api/appointment/doctor?doctorId={doctorId}&date={date}
```

**Parameters:**
- `doctorId` (string): Doctor's unique identifier
- `date` (string): Date in YYYY-MM-DD format

#### Schedule Appointment
```http
POST /api/appointment
Content-Type: application/json
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "serviceId": "507f1f77bcf86cd799439011",
  "patientId": "507f1f77bcf86cd799439015",
  "doctorId": "507f1f77bcf86cd799439012",
  "scheduledDateTime": "2024-01-15T10:00:00Z",
  "patientNotes": "Follow-up consultation",
  "appointmentType": "Consultation"
}
```

#### Update Appointment Status
```http
PUT /api/appointment/status
Content-Type: application/json
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "appointmentId": "507f1f77bcf86cd799439014",
  "status": "Completed",
  "doctorNotes": "Patient recovering well"
}
```

#### Cancel Appointment
```http
DELETE /api/appointment/{appointmentId}
Authorization: Bearer {jwt-token}
```

---

## 👤 Patient Identity API

**Base URL:** `http://localhost:5003/api/patientidentity`

### Endpoints

#### Register Patient
```http
POST /api/patientidentity/register-patient
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "patient@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1985-06-15",
  "phoneNumber": "+1-555-0123",
  "bloodType": "A+",
  "allergies": ["Penicillin", "Shellfish"],
  "chronicConditions": ["Hypertension"],
  "insuranceProvider": "HealthCare Plus",
  "insurancePolicyNumber": "HP123456789",
  "emergencyContactName": "Jane Doe",
  "emergencyContactPhone": "+1-555-0124"
}
```

#### Register Medical Staff
```http
POST /api/patientidentity/register-medical-staff
Content-Type: application/json
Authorization: Bearer {admin-jwt-token}
```

**Request Body:**
```json
{
  "email": "doctor@hospital.com",
  "password": "SecurePassword123!",
  "firstName": "Dr. Sarah",
  "lastName": "Johnson",
  "role": "Doctor",
  "department": "Cardiology",
  "licenseNumber": "MD123456",
  "specialization": "Interventional Cardiology",
  "phoneNumber": "+1-555-0125"
}
```

#### Patient Login
```http
POST /api/patientidentity/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "patient@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400,
  "user": {
    "id": "507f1f77bcf86cd799439015",
    "email": "patient@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "Patient"
  }
}
```

#### Get User Profile
```http
GET /api/patientidentity/profile/{userId}
Authorization: Bearer {jwt-token}
```

#### Update Profile
```http
PUT /api/patientidentity/profile
Content-Type: application/json
Authorization: Bearer {jwt-token}
```

---

## 🔐 Authentication & Authorization

### JWT Token Structure
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### User Roles
- **Patient**: Can view/manage own appointments and profile
- **Doctor**: Can view assigned appointments, update appointment status
- **Nurse**: Can assist with appointment management
- **Admin**: Full system access

### Role-Based Access Control
```http
# Example: Only doctors and admins can update appointment status
PUT /api/appointment/status
Authorization: Bearer {doctor-or-admin-token}
```

---

## 🚨 Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email format is invalid"
      }
    ],
    "timestamp": "2024-01-15T10:00:00Z",
    "path": "/api/patientidentity/register-patient"
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (e.g., appointment time already booked)
- `422` - Unprocessable Entity
- `500` - Internal Server Error

---

## 📊 Rate Limiting

### Default Limits
- **Patient endpoints**: 100 requests per minute
- **Medical staff endpoints**: 200 requests per minute
- **Admin endpoints**: 500 requests per minute

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

---

## 🧪 API Testing

### Using cURL

#### Schedule an Appointment
```bash
curl -X POST http://localhost:5002/api/appointment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "serviceId": "507f1f77bcf86cd799439011",
    "patientId": "507f1f77bcf86cd799439015",
    "doctorId": "507f1f77bcf86cd799439012",
    "scheduledDateTime": "2024-01-15T10:00:00Z",
    "patientNotes": "Regular checkup"
  }'
```

#### Get Medical Services
```bash
curl -X GET http://localhost:5001/api/medicalservices \
  -H "Accept: application/json"
```

### Using Postman
1. Import the provided Postman collection
2. Set up environment variables for base URLs and JWT tokens
3. Run the collection to test all endpoints

---

## 🔄 API Versioning

### Version Headers
```http
Accept: application/vnd.healthcare.v1+json
```

### URL Versioning (Future)
```http
GET /api/v1/medicalservices
GET /api/v2/medicalservices
```

---

## 📝 Changelog

### v1.0.0 (Current)
- Initial API implementation
- Basic CRUD operations for all entities
- JWT authentication
- Role-based authorization

### Planned Features
- Real-time notifications via WebSocket
- File upload for medical documents
- Advanced search and filtering
- API analytics and monitoring

---

*This API documentation is maintained alongside the codebase. For the most up-to-date information, refer to the Swagger/OpenAPI documentation available at `/swagger` on each service.*
