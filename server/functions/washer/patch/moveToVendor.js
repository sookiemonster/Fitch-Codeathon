const {prisma} = require("../../../lib/prisma");

async function moveToVendor(washerId, itemId, vendorId) {

    const item = await prisma.item.findUnique({
        where: { id: itemId },
    });

    if (!item) {
        throw new Error("Item not found");
    }

    if (!item.status !== "Fresh") {
        throw new Error("Item is not Clean");
    }

    const washer = await prisma.washer.findUnique({
        where: { id: washerId },
    });

    if (!washer) {
        throw new Error("Washer not found");
    }

    const vendor = await prisma.vendor.findUnique({
        where: { id: vendorId },
    });

    if (!vendor) {
        throw new Error("Vendor not found");
    }

    if (item.owner !== washerId) {
        throw new Error("This item is not owned by this washer");
    }

    await prisma.vendor.update({
        where: { id: vendorId },
        data: { inventory: { push: itemId } },
    });

    await prisma.washer.update({
        where: { id: washerId },
        data: { inventory: { set: washer.inventory.filter((i) => i !== itemId) } },
    });

    await prisma.item.update({
        where: { id: itemId },
        data: { owner: vendorId },
    });

    return `Item(${item.id}) was moved from Washer(${washerId}) to Vendor(${vendorId})`;
}

module.exports = {moveToVendor};