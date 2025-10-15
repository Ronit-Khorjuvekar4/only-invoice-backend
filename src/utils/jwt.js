const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '7d'

exports.generateToken = (payload) => {
    return jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
}

exports.verifyToken = (token) => {
    return jwt.verify(token,JWT_SECRET)
}