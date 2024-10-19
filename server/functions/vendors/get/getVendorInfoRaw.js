const { prisma } = require("../../../lib/prisma");

async function getVendorInfoRaw(id) {

    const vendor = await prisma.vendor.findUnique({
        where: { id: id },
        select: {
            id: true,
            name: true,
            x: true,
            y: true,
            inventory: true
        },
    });

    if (!vendor) {
        return null;
    }

    return vendor;
}


module.exports = { getVendorInfoRaw };