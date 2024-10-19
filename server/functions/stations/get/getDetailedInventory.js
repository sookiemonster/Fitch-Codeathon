const {fetchDetailedInventory} = require("../../vendors/util/fetchInventory");

async function getDetailedInventory(stationId) {
    const inventory = await fetchDetailedInventory(stationId);
    return inventory;
}

module.exports = {getDetailedInventory};