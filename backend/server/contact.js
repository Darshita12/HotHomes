const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Contact = require('../models/contact.model');

router.post('/', async (req, res) => {
    console.log(req.body)
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });

    try {
        const submitted = await contact.save();
        console.log('User added to database:', submitted);
        res.json(submitted);
    } catch (err) {
        console.log('Error saving user to database:', err);
        res.status(500).send('Error saving user to database');
    }
});



module.exports = router;