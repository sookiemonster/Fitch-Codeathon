const express = require('express');
const router = express.Router();

// GET /api/v1/discounts

router.get('/:id', (req, res) => {
    res.send('Getting given discount data');
});

// POST /api/v1/discounts

router.post('/', (req, res) => {
    res.send('Creating new discount');
});

module.exports = router;