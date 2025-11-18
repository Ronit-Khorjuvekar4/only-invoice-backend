const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be set');
}

exports.generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

// Use sync verify for HMAC secrets; wrap in try/catch in middleware.
exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);
