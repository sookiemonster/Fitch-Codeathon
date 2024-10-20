const express = require('express');
const router = express.Router();

const { getStationInfo } = require('../../functions/stations/get/getStationInfo.js');
const { getStationLocation } = require('../../functions/stations/get/getStationLocation.js');
const { getStationInventory } = require('../../functions/stations/get/getStationInventory.js');
const { getStationCapacity } = require('../../functions/stations/get/getStationCapacity.js');
const { getStationVolume } = require('../../functions/stations/get/getStationVolume.js');
const { getAllStationsIds } = require('../../functions/stations/get/getAllStationsIds.js');
const { getDetailedInventory} = require('../../functions/stations/get/getDetailedInventory.js');

const { addStationInventory } = require('../../functions/stations/patch/addStationInventory.js');
const { moveItemToWasher } = require('../../functions/stations/patch/moveItemToWasher.js');
const { getStationQR } = require('../../functions/stations/get/getStationQR.js');

// GET /api/v1/stations

router.get('/', async (req, res) => {
    try {
        const stations = await getAllStationsIds();
        return res.status(200).send(stations);
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
        const station = await getStationInfo(parseInt(id));
        if (!station) {
            return res.status(404).send({ message : 'Station not found' });
        }
        return res.send(station);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/qr', async (req, res) => {

    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const qr = await getStationQR(parseInt(id));
        if (!qr) {
            return res.status(404).send({ message : 'Station not found' });
        }
        return res.status(200).send(qr);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/location', async (req, res) => {
    
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }

    try {
        const location = await getStationLocation(parseInt(id));
        if (!location) {
            return res.status(404).send({ message : 'Station not found' });
        }
        return res.send(location);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/inventory', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }

    try {
        const inventory = await getStationInventory(parseInt(id));
        if (inventory === 0) {
            return res.status(404).send({ message : 'Station inventory is empty' });
        }
        if (!inventory) {
            return res.status(404).send({ message : 'Station not found' });
        }
        return res.send(inventory);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get('/:id/inventory/detailed', async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const inventory = await getDetailedInventory(parseInt(id));
        if (!inventory) {
            return res.status(404).send({ message : 'Station not found or inventory is empty' });
        }
        return res.send(inventory); 
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }

});

router.get('/:id/capacity', async (req, res) => {
    
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }

    try {
        const capacity = await getStationCapacity(parseInt(id));
        if (!capacity) {
            return res.status(404).send({ message : 'Station not found' });
        }
        return res.send(capacity);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.get("/:id/volume", async (req, res) => {

    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    try {
        const volume = await getStationVolume(parseInt(id));
        const capacity = await getStationCapacity(parseInt(id));
        if (volume === 0) {
            return res.status(404).send({ volume : `0/${capacity.capacity}` });

        }
        if (!volume) {
            return res.status(404).send({ message : 'Station not found' });
        }
        res.status(200).send({volume});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message : 'Internal server error' });
    }
});

// PATCH /api/v1/stations

router.patch('/:id/inventory/:item/add', async (req, res) => {
    const { id, item } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    if (!item || isNaN(item)) {
        return res.status(400).send({ message: 'Invalid or missing item' });
    }

    try {
        await addStationInventory(parseInt(id), parseInt(item));
        res.status(200).send({ message : 'Item was successfully added to station inventory!', stationId : id, itemId : item });
    } catch (error) {
        if (error.message === "Item not found") {
            return res.status(404).send({ message : 'Item not found' });
        }
        if (error.message === "Owner not found") {
            return res.status(404).send({ message : 'Owner not found' });
        }
        res.status(500).send({ message : 'Internal server error' });
    }
});

router.patch('/:id/inventory/:item/move/:washerId', async (req, res) => {
    const { id, item, washerId } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send({ message: 'Invalid or missing ID' });
    }
    if (!item || isNaN(item)) {
        return res.status(400).send({ message: 'Invalid or missing item' });
    }
    try {
        const message = await moveItemToWasher(parseInt(id), parseInt(item), parseInt(washerId));
        res.status(200).send({ message : message });
    } catch (error) {
        if (error.message === "Item not found") {
            return res.status(404).send({ message : 'Item not found' });
        }
        if (error.message === "Washer not found") {
            return res.status(404).send({ message : 'Washer not found' });
        }
        if (error.message === "Station not found") {
            return res.status(404).send({ message : 'Owner not found' });
        }
        if (error.message === "This item is not owned by this station") {
            return res.status(400).send({ message : 'This item is not owned by this station' });
        }
        res.status(500).send({ message : 'Internal server error' });
    }
});

module.exports = router;