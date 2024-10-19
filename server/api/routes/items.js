const express = require('express');
const router = express.Router();

const { getItemInfo } = require('../../functions/items/get/getItemInfo.js');
const { getItemName } = require('../../functions/items/get/getItemName.js');
const { getItemType } = require('../../functions/items/get/getItemType.js');
const { getItemStatus } = require('../../functions/items/get/getItemStatus.js');
const { getItemOwner } = require('../../functions/items/get/getItemOwner.js');

const { changeItemOwner } = require('../../functions/items/patch/changeItemOwner.js');

const { changeItemStatus } = require('../../functions/items/patch/changeItemStatus.js');
const {createItem} = require('../../functions/items/post/createItem.js');
const capitalizeFirstLetter = require('../../util/capitalizeFirstLetter.js');

// GET /api/v1/items

router.get('/:id', async (req, res) => {
   const { id } = req.params;
   if (!id || isNaN(id)) {
       return res.status(400).send({ message: 'Invalid or missing ID' });
   }
   try {
       const item = await getItemInfo(parseInt(id));
       if (!item) {
           return res.status(404).send({ message : 'Item not found' });
       }
       res.status(200).send({ item });
   } catch (error) {
       res.status(500).send({ message : 'Internal server error' });
   }
});

router.get('/:id/name', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const name = await getItemName(parseInt(id));
        if (!name) {
            return res.status(404).send({ message : 'Item not found' });
        }
        res.status(200).send({ name });
    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/type', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const type = await getItemType(parseInt(id));
        if (!type) {
            return res.status(404).send({ message : 'Item not found' });
        }
        res.status(200).send({ type });
    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/status', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const status = await getItemStatus(parseInt(id));
        if (!status) {
            return res.status(404).send({ message : 'Item not found' });
        }
        res.status(200).send({ status });
    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/owner', async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const owner = await getItemOwner(parseInt(id));
        if (!owner) {
            return res.status(404).send({ message : 'Item not found' });
        }
        res.status(200).send({ owner });
    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

// PATCH /api/v1/item

router.patch('/:id/setStatus/:status', async (req, res) => {
    const { id, status } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    if (!status || status !== "Fresh" || status !== "Dirty") {
        return res.status(400).send({ message: 'Invalid or missing status (status can only be "Fresh" or "Dirty")' });
    }

    try {
        const message = await changeItemStatus(parseInt(id), status);
        res.status(200).send({ message : message });
    } catch (error) {
        if (error.message === "Item not found") {
            return res.status(404).send({ message : 'Item not found' });
        }
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.patch('/:id/setOwner/:ownerId',async (req, res) => {
    const { id, ownerId } = req.params;
    const { force } = req.query
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    if (!ownerId || isNaN(ownerId)) {
        return res.status(400).send({ message: 'Invalid or missing owner ID' });
    }
    try {
        const message = await changeItemOwner(parseInt(id), parseInt(ownerId), force);
        res.status(200).send({ message : message });
    } catch (error) {
        if (error.message === "Item not found") {
            return res.status(404).send({ message : 'Item not found' });
        }
        if (error.message === "Entity not found") {
            return res.status(404).send({ message : 'Entity with given ID not found' });
        }

        if (error.message === "Item is already owned") {
            return res.status(400).send({ message : 'Item is already owned' });
        }
        res.status(500).send({ message : 'Internal server error' });
    }
});

// POST /api/v1/item

router.post('/create', async (req, res) => {
    const { name, type, status, owner } = req.body;

    if (!name && !status){
        return res.status(400).send({ message: 'Invalid or missing name and status' });
    }

    if (capitalizeFirstLetter(name) !== "Plate" && capitalizeFirstLetter(name) !== "Cup") {
        return res.status(400).send({ message: 'Invalid or missing name' });
    }

    if ( capitalizeFirstLetter(name) === "Plate" && !type ) {
        return res.status(400).send({ message: 'Invalid or missing type' });
    }
    console.log(status);
    if (!status || (status !== "Fresh" && status !== "Dirty")) {
        return res.status(400).send({ message: 'Invalid or missing status (status can only be "Fresh" or "Dirty")' });
    }

    try {
        const message = await createItem(name, type, status, owner);
        res.status(200).send({ message : message });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

module.exports = router;