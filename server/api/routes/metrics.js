const express = require('express');
const router = express.Router();

const { getMetrics } = require('../../functions/metrics/getMetrics.js');

// GET /api/v1/metrics

router.get('/', async (req, res) => {

    try {
        const metrics = await getMetrics();
        res.status(200).send(metrics);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

module.exports = router