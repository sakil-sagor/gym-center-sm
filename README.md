# Gym Class Scheduling and Membership Management System

## 📘 Project Overview

A web-based backend system built with TypeScript, Express.js, MongoDB, and Mongoose to efficiently manage gym operations. This system supports Admins, Trainers, and Trainees with role-specific features, ensuring smooth class scheduling, booking, and profile management.

## 🧱 Technology Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation:** Zod
- **Authentication:** JWT
- **Architecture:** Modular Pattern

## 👥 User Roles and Permissions

### Admin:

- Create Trainers
- Schedule Classes (Max 5/day)
- Assign Trainers to Classes
- View all Trainers and Trainees

### Trainer:

- View assigned schedules

### Trainee:

- Create/Update Profile
- Book class (Max 10 per class, no double-booking)
- Cancel bookings
- View own schedule

## 🔐 Authentication

JWT-based authentication is used. Users must log in to get a token. Protected routes require this token.

## 🔗 Live Link

_To be added after deployment_

## 🗂️ API Endpoints

### Auth

- `POST /api/v1/auth/login`

### Users

- `POST /api/v1/users/create-user`
- `GET /api/v1/users/` (Admin only)
- `GET /api/v1/users/:id` (Admin, Trainer, Trainee)
- `PATCH /api/v1/users/:id` (Admin, Trainer, Trainee)

### Trainers

- `POST /api/v1/trainers/create-trainer` (Admin only)
- `GET /api/v1/trainers/` (Admin only)

### Schedules

- `GET /api/v1/schedules/` (Admin, Trainee)
- `POST /api/v1/schedules/create-schedule` (Admin only)
- `GET /api/v1/schedules/trainee-schedules` (Trainee only)
- `GET /api/v1/schedules/trainer-schedules` (Trainer only)

### Bookings

- `POST /api/v1/bookings/book-class` (Trainee only)
- `POST /api/v1/bookings/cancel-class` (Trainee only)

## 🧩 Database Schema

### User Model

```ts
name: string;
email: string;
password: string;
age: number;
phone: string;
address: string;
role: 'admin' | 'trainer' | 'trainee';
```

### Schedule Model

```ts
trainer: ObjectId (ref: User);
date: string;
startTime: string;
endTime: string;
trainees: ObjectId[] (ref: User);
```

## 📈 ER Diagram

## 🧪 Testing Instructions

1. Use the login API with the admin credentials:

```ts
{
  "email": "admin@admin.com",
  "password": "123456"
}
```

2. Use the received token in headers as:

```ts
authorization:  <token>
```

3. Test endpoints like creating trainers, schedules, booking classes, etc.

## ⚙️ How to Run Locally

```ts
git clone <repository_url>
cd gym-scheduler
npm install

# Create .env file with:
PORT=5000
DATABASE_URL=<your_mongo_connection>
JWT_SECRET=your_jwt_secret

npm run start:dev
```

Server runs at: http://localhost:5000

## ✅ Success Response Example

```ts
{
  "success": true,
  "statusCode": 201,
  "message": "Class booked successfully",
  "data": {
    // response data here
  }
}
```

## ❌ Error Response Examples

### Validation Error

```ts
{
  "success": false,
  "message": "Validation error occurred.",
  "errorDetails": {
    "field": "email",
    "message": "Invalid email format."
  }
}
```

### Unauthorized Access

```ts
{
  "success": false,
  "message": "Unauthorized access.",
  "errorDetails": "You must be an admin to perform this action."
}
```

### Class Full Error

```ts
{
  "success": false,
  "message": "Class schedule is full. Maximum 10 trainees allowed per schedule."
}
```
