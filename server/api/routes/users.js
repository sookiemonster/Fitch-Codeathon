const express = require('express');
const router = express.Router();

// GET /api/v1/users

router.get('/:id', (req, res) => {
    res.send('Getting given user data')
});

router.get('/:id/history', (req, res) => {
    res.send('Getting given users history')
});

router.get('/:id/discounts', (req, res) => {
    res.send('Getting given users discounts')
});

router.get('/:id/points', (req, res) => {
    res.send('Getting given users points')
});

// PATCH /api/v1/users

router.patch('/:id/history/:item/add', (req, res) => {
    res.send('Updating given users history +');
});

router.patch('/:id/history/:item/setStatus', (req, res) => {
    res.send('Updating given item status in users history');
});

router.patch('/:id/discounts/:discount/add', (req, res) => {
    res.send('Updating given users discounts +');
});

router.patch('/:id/discounts/:discount/remove', (req, res) => {
    res.send('Updating given users discounts -');
});

router.patch('/:id/points/add', (req, res) => {
    res.send('Updating given users points +');
});

router.patch('/:id/points/remove', (req, res) => {
    res.send('Updating given users points -');
});

module.exports = router;