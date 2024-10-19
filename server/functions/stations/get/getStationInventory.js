const {fetchInventory} = require("../../vendors/util/fetchInventory");

async function getStationInventory(id) {
    const station = await fetchInventory(id);

    if (!station) {
        return 0;
    }
    return station;
}

module.exports = { getStationInventory }