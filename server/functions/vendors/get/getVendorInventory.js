const { fetchInventory } = require("../util/fetchInventory");

async function getVendorInventory(id) {

    const inventory = await fetchInventory(id);

    return inventory;
}


module.exports = { getVendorInventory };