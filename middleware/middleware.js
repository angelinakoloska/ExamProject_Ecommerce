const jwt = require('jsonwebtoken');

function ensureAuth (req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 'error', message: 'Failed to authenticate token' });
    }
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  });
}

function ensureAdmin(req, res, next) {
    if (req.user.role == "Admin") {
        next();
    }
    else {
        res.status(401).send({ status: "Unauthorized", error: "Only admin access" });
    }
    
}

module.exports = { ensureAuth, ensureAdmin };
