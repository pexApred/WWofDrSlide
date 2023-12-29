const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authMiddleware(req, res, next) {
    const token = req.cookies?.auth_token;
    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        if (error.name === 'TokenExpiredError') {
            // Handle token expiration (e.g., issue a new token, prompt for re-login, etc.)
        }
        res.clearCookie('auth_token');
        res.status(401).send({ authenticated: false });
    }
}


module.exports = authMiddleware;