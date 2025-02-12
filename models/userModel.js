const sql = require('../config/db');

const createUser = async (username, email, password, role) => {
  return await sql`INSERT INTO users (username, email, password, role) VALUES (${username}, ${email}, ${password}, ${role}) RETURNING *`;
};


const findUserByEmail = async (email) => {
  return await sql`SELECT * FROM users WHERE email = ${email}`;
};

module.exports = { createUser, findUserByEmail };
