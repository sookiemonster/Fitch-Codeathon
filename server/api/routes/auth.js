const express = require('express');
const router = express.Router();

// POST /api/v1/auth for users

router.post('/users/register', (req, res) => {
    res.send('Making new user account');
});

router.post('/users/login', (req, res) => {
    res.send('Logging in user');
});

// POST /api/v1/auth for vendors

router.post('/vendors/register', (req, res) => {
    res.send('Making new vendor account');
});

router.post('/vendors/login', (req, res) => {
    res.send('Logging in vendor');
});

module.exports = router;


