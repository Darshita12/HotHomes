const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');



// POST endpoint to add user
router.post('/register', async (req, res) => {
    // Create new user object from request body
    console.log(req.body)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    try {
        // Save new user to database
        const savedUser = await user.save();
        console.log('User added to database:', savedUser);
        res.json(savedUser);
    } catch (err) {
        console.log('Error saving user to database:', err);
        res.status(500).send('Error saving user to database');
    }
});


router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const userRecord = await User.findOne({ email, password, role }).exec();
        // if (!userRecord) {
        //     return res.status(401).json({ message: 'Invalid username or password' });
        // }
 
        if (!userRecord || userRecord.password !== password || userRecord.role != role || userRecord.email != email) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: userRecord.id, role: userRecord.role }, crypto.randomBytes(64).toString('hex'), { expiresIn: '1h' });

        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred' });
    }
});
module.exports = router;