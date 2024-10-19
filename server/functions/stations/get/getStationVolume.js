const { getStationInventory } = require("./getStationInventory");

async function getStationVolume(stationId) {
    const inventory = await getStationInventory(stationId);
    //console.log(inventory);

    if (!inventory) {
        return 0;
    }
    let volume = 0;
    for (const item of inventory) {
        volume += item.size;
    }

    return volume;
}

module.exports = { getStationVolume }