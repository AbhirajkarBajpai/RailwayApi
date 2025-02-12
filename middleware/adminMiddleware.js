require('dotenv').config();

const adminMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(403).send('Unauthorized access');
  }
};

module.exports = adminMiddleware;
