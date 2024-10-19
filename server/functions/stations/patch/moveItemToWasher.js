const {prisma} = require("../../../lib/prisma");

async function moveItemToWasher(stationId, itemId, washerId) {

    const item = await prisma.item.findUnique({
        where: { id: itemId },
    });

    const station = await prisma.station.findUnique({
        where: { id: stationId },
    });

    const washer = await prisma.washer.findUnique({
        where: { id: washerId },
    });

    if (!washer) {
        throw new Error("Washer not found");
    }

    if (!station) {
        throw new Error("Station not found");
    }

    if (!item) {
        throw new Error("Item not found");
    }

    if (item.owner !== stationId) {
        throw new Error("This item is not owned by this station");
    }

    await prisma.washer.update({
        where: { id: washerId },
        data: { inventory: { push: itemId } },
    });

    await prisma.station.update({
        where: { id: stationId },
        data: { inventory: { set: station.inventory.filter((i) => i !== itemId) } },
    });

    await prisma.item.update({
        where: { id: itemId },
        data: { owner: washerId },
    });

    return { message: `Item(${item.id}) moved from station(${station.id}) to washer(${washer.id})` };
}

module.exports = { moveItemToWasher }