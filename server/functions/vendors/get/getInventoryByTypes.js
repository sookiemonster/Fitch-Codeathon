const { fetchVendorInventoryByType } = require("../util/fetchInventory");

async function getVendorInventoryByType(id, name, type) {

    const inventory = await fetchVendorInventoryByType(id, name, type);

    return inventory;
}


module.exports = { getVendorInventoryByType };