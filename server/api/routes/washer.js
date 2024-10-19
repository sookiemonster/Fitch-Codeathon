const express = require('express');
const router = express.Router();

const {getWasherInventory} = require('../../functions/washer/get/getWasherInventory.js');

const {addToInventory} = require('../../functions/washer/patch/addToInventory.js');

const {moveToVendor} = require('../../functions/washer/patch/moveToVendor.js');

const {changeItemStatus} = require('../../functions/washer/patch/changeItemStatus.js');

// GET /api/v1/washer

router.get('/:id/inventory', async (req, res) => {
    
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }

    try {
        const inventory = await getWasherInventory(parseInt(id));
        if (inventory === 0) {
            return res.status(200).send({ message : 'Inventory is empty' });
        }
        if (!inventory) {
            return res.status(404).send({ message : 'Washer not found' });
        }
        res.status(200).send(inventory);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

// PATCH /api/v1/washer

router.patch('/:id/inventory/:item/add', async (req, res) => {
    const { id,item } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    if (!item || isNaN(item)) {
        return res.status(400).send({ message: 'Invalid or missing item ID' });
    }
    try {
        const status = await addToInventory(parseInt(id), parseInt(item));
        if (status === 1) {
            return res.status(200).send({ message : 'Item was successfully added to inventory!' });
        }
        res.status(409).send({ message : 'Item was not added to inventory' });
    } catch (error) {
        if (error.message === "Item not found") {
            return res.status(404).send({ message : 'Item not found' });
        }

        if (error.message === "Washer not found") {
            return res.status(404).send({ message : 'Washer not found' });
        }
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.patch('/:id/inventory/:item/move/:vendorId', async (req, res) => {
    const { id, item, vendorId } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    if (!item || isNaN(item)) {
        return res.status(400).send({ message: 'Invalid or missing item ID' });
    }
    if (!vendorId || isNaN(vendorId)) {
        return res.status(400).send({ message: 'Invalid or missing vendor ID' });
    }
    try {
        const message = await moveToVendor(parseInt(id), parseInt(item), parseInt(vendorId));
        res.status(200).send({ message : message });
    } catch (error) {
        if (error.message === "Item not found") {
            return res.status(404).send({ message : 'Item not found' });
        }
        if (error.message === "Vendor not found") {
            return res.status(404).send({ message : 'Vendor not found' });
        }
        if (error.message === "Washer not found") {
            return res.status(404).send({ message : 'Washer not found' });
        }
        if (error.message === "This item is not owned by this washer") {
            return res.status(400).send({ message : 'This item is not owned by this washer' });
        }

        if (error.message === "Item is not Clean") {
            return res.status(400).send({ message : 'Item is not Clean' });
        }
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.patch('/:id/inventory/:item/setStatus', async (req, res) => {
    
    const { id, item } = req.params;
    const { status } = req.query
    
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    if (!item || isNaN(item)) {
        return res.status(400).send({ message: 'Invalid or missing item ID' });
    }
    try {
        const message = await changeItemStatus(parseInt(id), parseInt(item), status);
        res.status(200).send({ message : message });
    } catch (error) {
        if (error.message === "Item not found") {
            return res.status(404).send({ message : 'Item not found' });
        }
        if (error.message === "Washer not found") {
            return res.status(404).send({ message : 'Washer not found' });
        }
        if (error.message === "This item is not owned by this washer") {
            return res.status(400).send({ message : 'This item is not owned by this washer' });
        }
        if (error.message === "Invalid status") {
            return res.status(400).send({ message : 'Invalid status' });
        }
        res.status(500).send({ message : 'Internal server error' });
    }
});

module.exports = router;