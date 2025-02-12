# Railway Management System
This is a Node.js/Express.js based Railway Management System similar to the IRCTC, which allows users to check train availability, book seats, and view booking details. The system also provides role-based access where admins can add/update trains, and users can check train availability, book seats, and view booking details. The system handles race conditions for simultaneous bookings and uses PostgreSQL as the database.

## Features

### Admin Role:

- Add new trains to the system.
- Update train details (available seats, source, destination, etc.).

### User Role:

- Check train availability between source and destination for a specific date.
- Book seats for a train.
- View booking details.

### Race Condition Handling: 
Prevents double booking of seats when multiple users try to book at the same time.

### Token-based Authentication:
Users need to log in and get a token to perform any booking or train checking tasks.

### API Key Security:
Admin APIs are protected with an API key to restrict unauthorized access.

### Tech Stack
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Authentication: JSON Web Token (JWT) for user authentication, API key for admin access

### Table of Contents
- (Installation)
- (Database Structure)
- (API Endpoints)
- (User Endpoints)
- (Admin Endpoints)
- (How to Use)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/railway-management-system.git
cd railway-management-system
```
2. Install dependencies:

```bash
npm install
```
3. Create a .env file in the root directory and configure your environment variables (example provided below and use .env.exmple for refrence):
```bash

ENDPOINT_ID='ENDPOINT_ID'
JWT_SECRET='your_jwt_secret'
API_KEY='your_api_key'
PORT=3000
```
#### Database Structure
4. Make this tables in your db:
- user
```bash
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) CHECK (role IN ('admin', 'user')) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
- train
```bash
CREATE TABLE trains (
    id SERIAL PRIMARY KEY,
    train_name VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
- booking
```bash
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    train_id INT REFERENCES trains(id) ON DELETE CASCADE,
    seat_number SERIAL NOT NULL,
    booking_status VARCHAR(50) DEFAULT 'confirmed', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
5. Start the server:
```bash
node app.js
```
6. The server will start at (http://localhost:3000).

### API Endpoints

#### User Endpoints
1. Register user
- Endpoint: POST /api/auth/register
- Description: Register a new user with role user.
- Request Body: username, email, password, role
- exmple:
```bash
{
  "username":"john",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user", //or admin
}
```
2. Login user
- Endpoint: POST /api/auth/login
- Description: login existing user.
- Request Body: email, password
- exmple:
```bash
{
  "email": "john.doe@example.com",
  "password": "password123",
}
```

3. Check Train Availability
- Endpoint: GET /api/availability
- Description: Check train availability between a source and destination on a particular date.
- Params: source, destination
- Headers: Requires a valid JWT token.
- exmple:
```bash
GET /api/trains/availability?source=NewDelhi&destination=Mumbai
```

4. Book Seats
- Endpoint: POST /api/book
- Description: Book seats on a train.
- Headers: Requires a valid JWT token.
- Exmple:
```bash
{
  "trainId": "1"
}
```

5. Get Booking Details
- Endpoint: GET /api/booking-details
- Description: Retrieve all bookings made by the user.
- Headers: Requires a valid JWT token.

#### Admin Endpoints
1. Register and login with role admin

2. Add Train
- Endpoint: POST /api/add
- Description: Add a new train to the system.
- Headers: Requires an Admin API key and jwt token.
- exmple:
```bash
{
  "train_name": "Rajdhani Express",
  "source": "NewDelhi",
  "destination": "Mumbai",
  "total_seats": 500
}
```

3. Update Train Seat
- Endpoint: PUT /api/update-seats/:id
- Description: Update the seat of an existing train.
- Headers: Requires an Admin API key and jwt token.
- Params: id (train ID)
- exmple:
```bash
"total_seats": 600
```

#### How to Use
- Admin: Use an API key to manage trains (add/update train details).
- Users:
-Register or login to the system.
-Check for train availability.
-Book seats on a train.
-View booking history.
