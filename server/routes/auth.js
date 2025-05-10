// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @POST /api/auth/register
router.post('/register/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
