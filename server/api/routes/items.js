const express = require('express');
const router = express.Router();

// GET /api/v1/items

router.get('/:id', (req, res) => {
    res.send('Get given item data');
});

router.get('/:id/type', (req, res) => {
    res.send('Get given item type');
});

// PATCH /api/v1/item

router.patch('/:id/setStatus', (req, res) => {
    res.send('Updating given item status');
});

router.patch('/:id/setOwner', (req, res) => {
    res.send('Updating given item owner');
});

// POST /api/v1/item

router.post('/', (req, res) => {
    res.send('Creating new item');
});

module.exports = router;