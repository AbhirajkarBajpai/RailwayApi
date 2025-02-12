// Importing necessary dependencies
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

// Initializing an Express router
const router = express.Router();

// Route to handle user registration
// Accessible to all users
router.post('/register', registerUser);

// Route to handle user login
// Accessible to all users
router.post('/login', loginUser);

// Exporting the router to be used in the main application
module.exports = router;