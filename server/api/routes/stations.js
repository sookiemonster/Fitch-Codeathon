const express = require('express');
const router = express.Router();

// GET /api/v1/stations

router.get('/:id', (req, res) => {
    res.send('Getting given stations data');
});

router.get('/:id/location', (req, res) => {
    res.send('Getting given stations location');
});

router.get('/:id/inventory', (req, res) => {
    res.send('Getting given stations inventory');
});

router.get('/:id/capacity', (req, res) => {
    res.send('Getting given stations capacity');
});

// PATCH /api/v1/stations

router.patch('/:id/inventory/:item/add', (req, res) => {
    res.send('Adding given item to stations inventory');
});

router.patch('/:id/inventory/:item/remove', (req, res) => {
    res.send('Removing given item from stations inventory');
});

module.exports = router;