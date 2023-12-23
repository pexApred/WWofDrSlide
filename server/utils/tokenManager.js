const jwt = require('jsonwebtoken');
const config = require('../config/config');


const secret = config.JWT_SECRET;
const expiration = '24h';
const refreshTokenExpiration = '365d';

class TokenManager {
  static signToken({ email, username, _id }) {
    const payload = { email, username, _id };

    const accessToken = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    const refreshToken = jwt.sign({ data: payload }, secret, { expiresIn: refreshTokenExpiration });

    return { accessToken, refreshToken };
  }

  static verifyToken(token) {
    return jwt.verify(token, secret);
  }
}

module.exports = TokenManager;