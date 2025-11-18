const {generateToken, verifyToken} = require('../utils/jwt')
const User = require('../models/authModel');


function getBearerToken(req) {
  const auth = req.headers?.authorization || '';
  console.log(auth)
  const [scheme, token] = auth.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token.trim();
}

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = getBearerToken(req);
    if (!token) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    let payload;
    try {
      payload = verifyToken(token);
      const user = await User.findById({'_id':payload.userId})
      if(!user) return res.status(401).json({error:'user no longer exists'})

    } catch (e) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = {
      id: payload,
      
    };

    return next();
  } catch (err) {
    // Unexpected errors
    console.error('[authMiddleware]', err);
    return res.status(500).json({ error: 'Auth verification failed' });
  }
}