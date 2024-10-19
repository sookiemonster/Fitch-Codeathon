const {fetchVendorInventoryByOnlyStatus} = require("../util/fetchInventory");

async function getVendorInventoryByOnlyStatus(id, status) {
    try {
        const items = await fetchVendorInventoryByOnlyStatus(id, status);
        return items;
    } catch (error) {
        throw error;
    }
}

module.exports = {getVendorInventoryByOnlyStatus};