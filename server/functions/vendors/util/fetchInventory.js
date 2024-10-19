const { prisma } = require("../../../lib/prisma");

async function fetchInventory(vendorId) {
    try {

        const items = await prisma.item.findMany({
            where: {
                owner: vendorId
            }
        });

        if (items.length === 0) {
            return null;
        }

        const size = items.length;
        return {items};

    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error; 
    }
}

async function fetchVendorInventoryByName(vendorId, name) {

    try {
        const items = await prisma.item.findMany({
            where: {
                owner: vendorId, 
                name: name
            }
        });

        if (items.length === 0) {
            return null;
        }

        return items;

    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error; 
    }

}

async function fetchVendorInventoryByType(vendorId, name, type) {

    try {
        const items = await prisma.item.findMany({
            where: {
                owner: vendorId, 
                type: type,
                name: name
            }
        });

        if (items.length === 0) {
            return null;
        }

        return items;

    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error; 
    }

}

async function fetchVendorInventoryByStatus(vendorId, name, type, status) {

    try {
        let items = null;
        console.log("Using status", name, type, status);
        if (name ==="Cup"){
            items = await prisma.item.findMany({
                where: {
                    owner: vendorId, 
                    name: name,
                    status: status
                }
            });
        } else {
            items = await prisma.item.findMany({
                where: {
                    owner: vendorId, 
                    type: type,
                    name: name,
                    status: status
                }
            });
        }

        if (items.length === 0) {
            return null;
        }

        return items;

    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error; 
    }

}

async function fetchVendorInventoryByOnlyStatus(id, status) {

    try {
        const items = await prisma.item.findMany({
            where: {
                owner: id, 
                status: status
            }
        });

        if (items.length === 0) {
            return null;
        }

        return items;

    } catch (error) {;
        throw error; 
    }
}

async function fetchDetailedInventory(id) {

    const fetchedInventory = await fetchInventory(id);

    if (!fetchedInventory) {
        return null;
    }

    //console.log(fetchedInventory);

    let cups = 0, plates = 0, halal = 0, veg = 0, reg = 0, cleanPlates = 0, dirtyPlates = 0, cleanCups = 0, dirtyCups = 0, halalDirty = 0, halalClean = 0, vegDirty = 0, vegClean = 0, regDirty = 0, regClean = 0;

    if (fetchedInventory.items && Array.isArray(fetchedInventory.items)) {
        fetchedInventory.items.forEach(item => {
    
            //console.log("Item", item);
    
            if (item.name === "Cup") {
                if (item.status === "Fresh") {
                    cleanCups += 1;
                } else {
                    dirtyCups += 1;
                }
                cups += 1;
            }
    
            if (item.name === "Plate") {
                if (item.type === "Halal") {
                    if (item.status === "Fresh") {
                        halalClean += 1;
                    } else {
                        halalDirty += 1;
                    }
                    halal += 1;
                } else if (item.type === "Vegetarian") {
                    if (item.status === "Fresh") {
                        vegClean += 1;
                    } else {
                        vegDirty += 1;
                    }
                    veg += 1;
                } else {
                    if (item.status === "Fresh") {
                        regClean += 1;
                    } else {
                        regDirty += 1;
                    }
                    reg += 1;
                }
    
                if (item.status === "Fresh") {
                    cleanPlates += 1;
                } else {
                    dirtyPlates += 1;
                }
    
                plates += 1;
            }
    
        });
    } else {
        console.error("No valid items found in fetchedInventory");
    }

    return {cups, plates, halal, veg, reg, cleanPlates, dirtyPlates, cleanCups, dirtyCups, halalDirty, halalClean, vegDirty, vegClean, regDirty, regClean};
}

module.exports = { fetchInventory, fetchVendorInventoryByType, fetchVendorInventoryByName, fetchVendorInventoryByStatus, fetchVendorInventoryByOnlyStatus, fetchDetailedInventory };
