const { fetchVendorInventoryByName } = require("../util/fetchInventory");

async function getVendorInventoryByName(id, type) {

    const inventory = await fetchVendorInventoryByName(id, type);

    return inventory;
}


module.exports = { getVendorInventoryByName };