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
        return {size, ...items};

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

module.exports = { fetchInventory, fetchVendorInventoryByType, fetchVendorInventoryByName, fetchVendorInventoryByStatus, fetchVendorInventoryByOnlyStatus };
