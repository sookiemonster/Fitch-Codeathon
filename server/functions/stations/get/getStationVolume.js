const { getStationInventory } = require("./getStationInventory");

async function getStationVolume(stationId) {
    const inventory = await getStationInventory(stationId);
    console.log(inventory);

    if (!inventory || !inventory.items) {
        return 0;
    }
    
    let volume = 0;
    for (const item of inventory.items) {
        console.log(item.size);
        volume += item.size;
    }

    return volume;
}

module.exports = { getStationVolume }
