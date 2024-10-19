const {prisma} = require("../../../lib/prisma");

async function addToInventory(washerId, itemId) {

    const item = await prisma.item.findUnique({
        where: { id: itemId },
    });

    if (!item) {
        throw new Error("Item not found");
    }

    const washer = await prisma.washer.findUnique({
        where: { id: washerId },
    });

    if (!washer) {
        throw new Error("Washer not found");
    }

    await prisma.washer.update({
        where: { id: washerId },
        data: { inventory: { push: itemId } },
    });

    await prisma.item.update({
        where: { id: itemId },
        data: { owner: washerId },
    });

    return 1;
}

module.exports = {
    addToInventory,
}