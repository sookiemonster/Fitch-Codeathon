const {prisma} = require("../../../lib/prisma");

async function getVendorLocation(vendorId) {
    const vendor = await prisma.vendor.findUnique({
        where: { id: vendorId },
        select: {
            x: true,
            y: true
        }
    });

    if (!vendor) {
        return null;
    }

    return vendor;
}

module.exports = { getVendorLocation }