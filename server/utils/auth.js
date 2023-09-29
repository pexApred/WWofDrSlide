const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { AuthenticationError } = require('apollo-server-express');
// set token secret and expiration date
dotenv.config();
const secret = process.env.JWT_SECRET;
const expiration = '24h';
const refreshTokenExpiration = '7d';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req, res }) {
    // allows token to be sent via  req.query or headers
    // let token = req.headers.authorization;
    let token = req.cookies.auth_token;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch (err) {
      console.log('Invalid token', err);
      const refreshToken = req.cookies.refresh_token;
      if (refreshToken) {
        try {
          const { data } = jwt.verify(refreshToken, secret);
          req.user = data;
          console.log('req.user', req.user); 
          const newAccessToken = jwt.sign({ data }, secret, { expiresIn: expiration });
          res.cookie('auth_token', newAccessToken, { httpOnly: true });
        } catch { refreshErr } {
          console.log('Invalid refresh token', refreshErr);
          throw new AuthenticationError('invalid token!');
        }
      } else {
        console.log('Invalid Token', err);
        throw new AuthenticationError('invalid token!');
      }
    }
    // send to next endpoint
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    const accessToken = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    const refreshToken = jwt.sign({ data: payload }, secret, { expiresIn: refreshTokenExpiration });

    return { accessToken, refreshToken };
  },
};
