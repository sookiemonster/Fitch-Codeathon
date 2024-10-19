const {prisma} = require("../../../lib/prisma");

async function getAllVendorsIds() {
    const vendors = await prisma.vendor.findMany({
        select: {
            id: true
        }
    });

    const size = vendors.length;

    return {...vendors, size};
}

module.exports = {getAllVendorsIds}