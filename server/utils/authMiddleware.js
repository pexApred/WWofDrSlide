// const { AuthenticationError } = require('apollo-server-express');
// const TokenManager = require('./tokenManager');

// function authMiddleware({ req, res }) {
//     console.log('Cookies:', req.cookies);
//     if (!req.cookies) {
//         console.log('No cookies found in request');
//         return req;
//     } else {
//     }
//     let token = req.cookies.auth_token || '';
//     if (req.headers.authorization) {
//         token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//         return req;
//     }

//     try {
//         const { data } = TokenManager.verifyToken(token);
//         req.user = data;
//     } catch (err) {
//         handleTokenError(err, req, res);
//     }
//     console.log('Completed authMiddleware processing', { user: req.user });
//     return req;
// }

// function handleTokenError(err, req, res) {
//     const refreshToken = req.cookies.refresh_token;
//     if (refreshToken) {
//         try {
//             const { data } = TokenManager.verifyToken(refreshToken);
//             req.user = data;
//             const newAccessToken = TokenManager.signToken(data).accessToken;
//             res.cookie('auth_token', newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
//         } catch (refreshErr) {
//             throw new AuthenticationError('invalid token!');
//         }
//     } else {
//         throw new AuthenticationError('invalid token!');
//     }
// }

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authMiddleware(req, res, next) {
    const token = req.cookies?.auth_token;
    if (!token) {
        console.log("No token found in cookies");
        return next(); // Continue without setting req.user
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