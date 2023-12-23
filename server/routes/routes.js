const express = require('express');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1d" });
    console.log("Issuing token:", token, "Expires in 1 day");
    const resetLink = `http://localhost:5173/reset_password/${user._id}/${token}`;
    // Implement email sending logic here

    res.send({ message: "Password reset email sent." });
});

router.post('/logout', (req, res) => {
    console.log('Logout route hit');
    res.clearCookie('auth_token', { path: '/', secure: true });
    res.clearCookie('refresh_token', { path: '/', secure: true });
    res.status(200).send({ message: 'Logged out' });
});


module.exports = router;
