const sql = require('../config/db');

const createTrain = async (train_name, source, destination, total_seats) => {
  console.log(train_name, source, destination, total_seats);
  return await sql`
    INSERT INTO trains (train_name, source, destination, total_seats)
    VALUES (${train_name}, ${source}, ${destination}, ${total_seats})
    RETURNING *
  `;
};

const updateSeats = async (trainId, total_seats) => {
  return await sql`
    UPDATE trains 
    SET total_seats = ${total_seats} 
    WHERE id = ${trainId} 
    RETURNING *
  `;
};

module.exports = { createTrain, updateSeats };
