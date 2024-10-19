const { prisma } = require("../../../lib/prisma");
const { fetchInventory } = require("../util/fetchInventory");

async function getVendorInfo(id) {

    const vendor = await prisma.vendor.findUnique({
        where: { id: id },
        select: {
            id: true,
            name: true,
            x: true,
            y: true,
            inventory: false
        },
    });

    if (!vendor) {
        return null;
    }

    const inventory = await fetchInventory(id);

    return {...vendor, inventory};
}


module.exports = { getVendorInfo };