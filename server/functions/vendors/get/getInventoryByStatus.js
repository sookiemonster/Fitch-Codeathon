const { fetchVendorInventoryByStatus } = require("../util/fetchInventory");

async function getVendorInventoryByStatus(id, name, type, status) {

    const inventory = await fetchVendorInventoryByStatus(id, name, type, status);

    return inventory;
}


module.exports = { getVendorInventoryByStatus };