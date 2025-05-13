const jwt = require('jsonwebtoken');
const apiResponse = require('../utils/apiResponse');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return apiResponse.error(res, 401, 'No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return apiResponse.error(res, 401, 'Token expired');
    }
    return apiResponse.error(res, 401, 'Invalid token');
  }
};

module.exports = authMiddleware;