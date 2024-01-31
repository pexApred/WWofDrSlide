const express = require('express');
// const UserModel = require('../models/User');
// const jwt = require('jsonwebtoken');
// const config = require('../config/config');
const router = express.Router();

// const isProduction = process.env.NODE_ENV === 'production';
// const backendBaseURL = isProduction
// ? 'https://www.thewonderfulworldofdrslide.com'
// : 'http://localhost:5173';
// const frontendBaseURL = isProduction
// ? 'https://www.thewonderfulworldofdrslide.com'
// : 'http://localhost:3000'


// router.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//         return res.status(404).send({ message: "User not found" });
//     }

    // const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1d" });
    // const resetLink = `https://www.thewonderfulworldofdrslide.com/reset_password/${user._id}/${token} || http://localhost:5173/reset_password/${user._id}/${token}`;

//     res.send({ message: "Password reset email sent." });
// });

router.get('/reset-password', (req, res) => {
    const { token } = req.query;
    const frontendResetPasswordUrl = `https://www.thewonderfulworldofdrslide.com/reset-password?token=${token}`;
    res.redirect(frontendResetPasswordUrl);
});

router.post('/logout', (req, res) => {
    console.log('Logout route hit');
    res.clearCookie('auth_token', { path: '/', secure: true });
    res.clearCookie('refresh_token', { path: '/', secure: true });
    res.status(200).send({ message: 'Logged out' });
});

module.exports = router;
