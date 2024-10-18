const express = require('express');
const router = express.Router();

// GET /api/v1/washer

router.get('/inventory', (req, res) => {
    res.send('Getting given washers inventory');
});

// PATCH /api/v1/washer

router.patch('/inventory/:item/add', (req, res) => {
    res.send('Adding given item to washers inventory');
});

router.patch('/inventory/:item/remove', (req, res) => {
    res.send('Removing given item from washers inventory');
});

router.patch('/inventory/:item/setStatus', (req, res) => {
    res.send('Updating given item status in washers inventory');
});

module.exports = router;