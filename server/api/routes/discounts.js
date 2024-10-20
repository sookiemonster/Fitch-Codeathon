const express = require('express');
const router = express.Router();

const {getDiscountInfo} = require('../../functions/discounts/get/getDiscountInfo.js');
const {createDiscount} = require('../../functions/discounts/post/createDiscount.js');
const {deleteDiscount} = require('../../functions/discounts/delete/deleteDiscount.js');
const { getDiscountQR } = require('../../functions/discounts/get/getDiscountQR.js');

// GET /api/v1/discounts

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }

    try {
        const discount = await getDiscountInfo(parseInt(id));
        if (!discount) {
            return res.status(404).send({ message : 'Discount not found' });
        }
        res.status(200).send(discount);
    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/qr', async (req, res) => {

    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }

    try {
        
        const discount = await getDiscountQR(parseInt(id));
        if (!discount) {
            return res.status(404).send({ message : 'Discount not found' });
        }
        res.status(200).send(discount);
    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

// POST /api/v1/discounts

router.post('/create', async (req, res) => {
    
    const { cost, reward } = req.body;
    if (!cost || isNaN(cost)) {
        return res.status(400).send({ message: 'Invalid or missing cost' });
    }
    if (!reward || isNaN(reward)) {
        return res.status(400).send({ message: 'Invalid or missing reward' });
    }

    try {
        const discount = await createDiscount(cost, reward);
        res.status(200).send({ message : discount });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

// DELETE /api/v1/discounts

router.delete('/:id', async (req, res) => {
    
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }

    try {
        const discountId = await deleteDiscount(parseInt(id));
        res.status(200).send({ message : "Discount was successfully deleted!", discountId : discountId });
    } catch (error) {
        if (error.message === "Discount not found") {
            return res.status(404).send({ message : 'Discount not found' });
        }
        res.status(500).send({ message : 'Internal server error' });
    }   
});

module.exports = router;