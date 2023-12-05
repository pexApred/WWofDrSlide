// const express = require('express');
// const UserModel = require('../models/User');
// const sendEmail = require('../services/emailService');
// const jwt = require('jsonwebtoken');
// const config = require('../config/config');
// const authMiddleware = require('../utils/authMiddleware');

// const router = express.Router();

// router.post('/forgot-password', (req, res) => {
//     const { email } = req.body;
//     UserModel.findOne({ email: email })
//         .then(user => {
//             if (!user) {
//                 return res.status(404).send({ Status: "User not existed" });
//             }
//             const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1d" });

//             // Replace 'localhost:5173' with your client-side URL where the password reset is handled
//             const resetLink = `http://localhost:5173/reset_password/${user._id}/${token}`;

//             sendEmail(user.email, 'Reset Password Link', resetLink)
//                 .then(result => {
//                     if (result.success) {
//                         res.send({ Status: "Success", Message: "Password reset email sent." });
//                     } else {
//                         res.status(500).send({ Status: "Error", Message: "Failed to send email." });
//                     }
//                 })
//                 .catch(error => {
//                     console.error("Email sending error:", error);
//                     res.status(500).send({ Status: "Error", Message: "Error sending email." });
//                 });
//         })
//         .catch(error => {
//             console.error("Database error:", error);
//             res.status(500).send({ Status: "Error", Message: "Server error." });
//         });
// });

// router.post('/logout', (req, res) => {
//     // // If using sessions, destroy the session
//     if (req.session) {
//         req.session.destroy((err) => {
//             if (err) {
//                 return res.status(500).send('Could not log out');
//             }
//         });
//     }

//     // If using cookies, clear the authentication cookie
//     res.clearCookie('auth_token');
//     res.clearCookie('refresh_token');

//     return res.status(200).send('Logged out');
// });

// router.get('/api/auth/check-session', authMiddleware, (req, res) => {
//     console.log('Check session route hit', req.user);
//     try {
//     if (req.user) {
//         res.status(200).send({ authenticated: true });
//     } else {
//         res.status(401).send({ authenticated: false });
//     }
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
// }
// });

// module.exports = router;

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
    res.clearCookie('auth_token');
    res.clearCookie('refresh_token');
    res.status(200).send({ message: 'Logged out' });
});

module.exports = router;
