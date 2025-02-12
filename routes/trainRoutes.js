// Importing necessary dependencies
const express = require('express');

// Importing the controller functions to handle train operations
const { addTrain, updateTrainSeats } = require('../controllers/trainController');

// Importing middleware for authentication and role-based access control
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Initializing an Express router
const router = express.Router();

// Route to add a train
// Protected route: Only authenticated users with the 'admin' role can access
router.post('/add', authMiddleware, roleMiddleware(['admin']), addTrain);

// Route to update available seats for a specific train
// Protected route: Only authenticated users with the 'admin' role can access
router.put('/update-seats/:id', authMiddleware, roleMiddleware(['admin']), updateTrainSeats);

// Exporting the router to be used in the main application
module.exports = router;
