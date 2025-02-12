// Importing necessary dependencies
const express = require('express');
const { checkAvailability, bookSeats, getBookingDetails } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to ensure user is authenticated

// Initializing an Express router
const router = express.Router();

// Route to check train availability
// Protected route: Only authenticated users can access
router.get('/availability', authMiddleware, checkAvailability);

// Route to book seats for a train
// Protected route: Only authenticated users can access
router.post('/book', authMiddleware, bookSeats);

// Route to get booking details for a user
// Protected route: Only authenticated users can access
router.get('/booking-details', authMiddleware, getBookingDetails);

// Exporting the router to be used in the main application
module.exports = router;