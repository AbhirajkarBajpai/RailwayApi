const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
require('dotenv').config();


const handleErrorResponse = (res, status, message) => {
  return res.status(status).json({ error: message });
};


const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return handleErrorResponse(res, 400, 'All fields are required');
  }

  try {
    
    const existingUser = await findUserByEmail(email);
    if (existingUser.length > 0) {
      return handleErrorResponse(res, 400, 'Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword, role);
    
    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Error registering user:', err);
    return handleErrorResponse(res, 500, 'Internal server error');
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleErrorResponse(res, 400, 'Email and password are required');
  }

  try {
    const result = await findUserByEmail(email);
    if (result.length === 0) {
      return handleErrorResponse(res, 404, 'User not found');
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return handleErrorResponse(res, 401, 'Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    req.user = { id: user.id, role: user.role };
    
    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error logging in:', err);
    return handleErrorResponse(res, 500, 'Internal server error');
  }
};

module.exports = { registerUser, loginUser };
