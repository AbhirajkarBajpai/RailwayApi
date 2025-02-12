const { modelbookSeats, modelcheckAvailability, modelgetBookingDetails } = require('../models/bookingModel');
const Train = require('../models/trainModel'); 

const handleErrorResponse = (res, status, message) => {
  return res.status(status).json({ error: message });
};

const checkAvailability = async (req, res) => {
  const { source, destination } = req.query;
  if (!source || !destination) {
    return handleErrorResponse(res, 400, 'Source and destination are required');
  }
  
  try {
    const availableTrains = await modelcheckAvailability(source, destination);
    return res.status(200).json(availableTrains);
  } catch (err) {
    console.error('Error checking availability:', err);
    return handleErrorResponse(res, 500, 'Internal server error');
  }
};

// Book seats for a train
const bookSeats = async (req, res) => {
  const { trainId } = req.body;
  const userId = req.user?.id; 

  if (!userId) {
    return handleErrorResponse(res, 401, 'Unauthorized access');
  }
  if (!trainId) {
    return handleErrorResponse(res, 400, 'Train ID is required');
  }
  
  try {
    const booking = await modelbookSeats(userId, trainId);
    return res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error('Error booking seats:', err);
    return handleErrorResponse(res, 500, 'Internal server error');
  }
};

// Get booking details for a user
const getBookingDetails = async (req, res) => {
  const userId = req.user?.id;
  
  if (!userId) {
    return handleErrorResponse(res, 401, 'Unauthorized access');
  }
  
  try {
    const bookings = await modelgetBookingDetails(userId);
    return res.status(200).json(bookings);
  } catch (err) {
    console.error('Error getting booking details:', err);
    return handleErrorResponse(res, 500, 'Internal server error');
  }
};

module.exports = { checkAvailability, bookSeats, getBookingDetails };
