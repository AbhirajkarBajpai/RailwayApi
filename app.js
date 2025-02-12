// Importing necessary dependencies
const express = require('express');
require('dotenv').config();  // Load environment variables from .env file

// Importing route files for handling authentication, train management, and bookings
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const sql = require('./config/db');

(async () => {
  try {
    await sql`SELECT 1`;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process on database failure
  }
})();

// Initializing Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Setting up route handlers for different functionalities
app.use('/api/auth', authRoutes);     // Routes for authentication (login, registration)
app.use('/api', trainRoutes);         // Routes for train-related operations (add, update, etc.)
app.use('/api', bookingRoutes);       // Routes for booking-related operations

// Defining the port to run the server (using environment variable or defaulting to 3000)
const PORT = process.env.PORT || 3000;

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
