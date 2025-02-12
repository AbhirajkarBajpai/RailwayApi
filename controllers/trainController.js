const { createTrain, updateSeats } = require('../models/trainModel');

const handleErrorResponse = (res, status, message) => {
  return res.status(status).json({ error: message });
};


const addTrain = async (req, res) => {
  const { train_name, source, destination, total_seats } = req.body;

  if (!train_name || !source || !destination || total_seats === undefined) {
    return handleErrorResponse(res, 400, 'All fields (train_name, source, destination, total_seats) are required');
  }

  try {
    const newTrain = await createTrain(train_name, source, destination, total_seats);
    return res.status(201).json({ message: 'Train added successfully', train: newTrain });
  } catch (err) {
    console.error('Error adding train:', err);
    return handleErrorResponse(res, 500, 'Internal server error');
  }
};

const updateTrainSeats = async (req, res) => {
  const { id } = req.params; // Train ID
  const { total_seats } = req.body;

  if (!id) {
    return handleErrorResponse(res, 400, 'Train ID is required');
  }
  if (total_seats === undefined) {
    return handleErrorResponse(res, 400, 'Total seats value is required');
  }

  try {
    const updatedTrain = await updateSeats(id, total_seats);
    if (!updatedTrain) {
      return handleErrorResponse(res, 404, 'Train not found');
    }
    return res.status(200).json({ message: 'Seats updated successfully', train: updatedTrain });
  } catch (err) {
    console.error('Error updating seats:', err);
    return handleErrorResponse(res, 500, 'Internal server error');
  }
};

module.exports = { addTrain, updateTrainSeats };