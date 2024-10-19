const {fetchDetailedInventory} = require("../util/fetchInventory");
async function getVendorInventoryDetailed(vendorId) {

    const inventory = await fetchDetailedInventory(vendorId);

    return inventory;
};

module.exports = { getVendorInventoryDetailed };