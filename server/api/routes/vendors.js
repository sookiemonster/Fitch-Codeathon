const express = require('express');
const router = express.Router();

const capitalizeFirstLetter = require('../../util/capitalizeFirstLetter');

const { getVendorInfo } = require('../../functions/vendors/get/getVendorInfo.js');
const { getVendorInfoRaw } = require('../../functions/vendors/get/getVendorInfoRaw.js');
const { getVendorLocation } = require('../../functions/vendors/get/getVendorLocation.js');
const { getVendorInventory } = require('../../functions/vendors/get/getVendorInventory.js');
const { getVendorInventoryByType } = require('../../functions/vendors/get/getInventoryByTypes.js');
const { getVendorInventoryByName } = require('../../functions/vendors/get/getInventoryByName.js');
const { getVendorInventoryByStatus } = require('../../functions/vendors/get/getInventoryByStatus.js');
const { getVendorInventoryDetailed } = require('../../functions/vendors/get/getVendorInventoryDetailed.js');

const { getAllVendorsIds } = require('../../functions/vendors/get/getAllVendorsIds.js');

const { addItemToVendorInventory } = require('../../functions/vendors/patch/addItemToVendorInventory.js');
const { moveItemFromVendorToUser } = require('../../functions/vendors/patch/moveItemFromVendorToUser.js');
const { getVendorInventoryByOnlyStatus } = require('../../functions/vendors/get/getVendorInventoryByOnlyStatus.js');

// GET /api/v1/vendors

router.get('/', async (req, res) => {
    try {
        const vendors = await getAllVendorsIds();
        return res.status(200).send(vendors);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const vendor = await getVendorInfo(parseInt(id));
        if (!vendor) {
            return res.status(404).send({ message : 'Vendor not found' });
        } 

        res.status(200).send(vendor);

    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/raw', async (req, res) => {

    const { id } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const vendor = await getVendorInfoRaw(parseInt(id));
        if (!vendor) {
            return res.status(404).send({ message : 'Vendor not found' });
        } 

        res.status(200).send(vendor);

    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/location', async (req, res) => {
    
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const location = await getVendorLocation(parseInt(id));
        if (!location) {
            return res.status(404).send({ message : 'Vendor not found' });
        } 

        res.status(200).send(location);

    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/inventory', async (req, res) => {
    
    const { id } = req.params;

    const { type, name, status } = req.query;

    console.log(id, type, name, status);
    
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        let inventory;
        if (id && !name && !type && !status) {
            inventory = await getVendorInventory(parseInt(id));
            if (!inventory) {
                return res.status(404).send({ message : 'Vendor not found' });
            }
        }

        if (id && name && !type && !status) {
            inventory = await getVendorInventoryByName(parseInt(id), capitalizeFirstLetter(name));
            if (!inventory) {
                return res.status(404).send({ message : 'Vendor not found' });
            }
        }

        if (id && name && type && !status) {
            inventory = await getVendorInventoryByType(parseInt(id), capitalizeFirstLetter(name), capitalizeFirstLetter(type));
            if (!inventory) {
                return res.status(404).send({ message : 'Vendor not found' });
            }
        }
        
        if (id && name && type && status) {
            inventory = await getVendorInventoryByStatus(parseInt(id), capitalizeFirstLetter(name), capitalizeFirstLetter(type), capitalizeFirstLetter(status));
            if (!inventory) {
                return res.status(404).send({ message : 'Vendor not found' });
            }
        }
        
        if (id && !name && !type && status) {
            inventory = await getVendorInventoryByOnlyStatus(parseInt(id), capitalizeFirstLetter(status));
            if (!inventory) {
                return res.status(404).send({ message : 'Vendor not found' });
            }
        }

        res.status(200).send(inventory);

    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/inventory/detailed', async (req, res) => {

    const { id } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const inventory = await getVendorInventoryDetailed(parseInt(id));
        if (!inventory) {
            return res.status(404).send({ message : 'Vendor not found' });
        } 

        res.status(200).send(inventory);

    } catch (error) {
        res.status(500).send({ message : 'Internal server error' });
    }
});

// PATCH /api/v1/vendors

router.patch('/:id/inventory/:item/add', async (req, res) => {
    
    const { id, item } = req.params;
    const { status } = req.query;
    
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    if (!item || isNaN(item)) {
        return res.status(400).send({ message: 'Invalid or missing item ID' });
    }
    try {
        await addItemToVendorInventory(parseInt(id), parseInt(item), capitalizeFirstLetter(status));
    } catch (error) {
        if (error.message === "Item not found") {
            return res.status(404).send({ message : 'Item not found' });
        }

        if (error.message === "Owner not found") {
            return res.status(404).send({ message : 'Owner not found' });
        }

        if (error.message === "Item is not fresh") {
            return res.status(400).send({ message : 'Item is not fresh' });
        }
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.patch('/:id/inventory/:item/move/:userId', async (req, res) => {
    
    const { id, item, userId } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    if (!item || isNaN(item)) {
        return res.status(400).send({ message: 'Invalid or missing item ID' });
    }
    try {
        await moveItemFromVendorToUser(parseInt(id), parseInt(item), parseInt(userId));
        res.status(200).send({ message : 'Item was successfully removed from inventory!' });
    } catch (error) {

        if (error.message === "Item not found") {
            return res.status(404).send({ message : 'Item not found' });
        }

        if (error.message === "User not found") {
            return res.status(404).send({ message : 'User not found' });
        }

        if (error.message === "Vendor not found") {
            return res.status(404).send({ message : 'Item is not fresh' });
        }

        if (error.message === "This item is not owned by this vendor") {
            return res.status(400).send({ message : 'This item is not owned by this vendor' });
        }

        res.status(500).send({ message : 'Internal server error' });
    }
});

module.exports = router;