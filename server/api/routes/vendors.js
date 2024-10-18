const express = require('express');
const router = express.Router();

// GET /api/v1/vendors

router.get('/:id', (req, res) => {
    res.send('Getting given vendors data')
});

router.get('/:id/location', (req, res) => {
    res.send('Getting given vendors location')
});

router.get('/:id/inventory', (req, res) => {
    res.send('Getting given vendors inventory')
});

// PATCH /api/v1/vendors

router.patch('/:id/inventory/:item/add', (req, res) => {
    res.send('Adding given item to vendors inventory');
});

router.patch('/:id/inventory/:item/remove', (req, res) => {
    res.send('Removing given item from vendors inventory');
});

router.patch('/:id/inventory/:item/setStatus', (req, res) => {
    res.send('Updating given item status in vendors inventory');
});

module.exports = router;