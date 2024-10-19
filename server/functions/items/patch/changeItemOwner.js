const {prisma} = require("../../../lib/prisma");

async function changeItemOwner(itemId, ownerId, force = false) {

    const item = await prisma.item.findUnique({
        where: {id: itemId}
    })

    const user = await prisma.user.findUnique({
        where: {id: ownerId}
    })
    const vendor = await prisma.vendor.findUnique({
        where: {id: ownerId}
    })
    const station = await prisma.station.findUnique({
        where: {id: ownerId}
    })
    const washer = await prisma.washer.findUnique({
        where: {id: ownerId}
    })

    if (!user && !vendor && !station && !washer) {
        throw new Error("Entity not found")
    }

    if (!item) {
        throw new Error("Item not found")
    }
    if (item.owner && !force) {
        throw new Error("Item is already owned")
    }

    if (user) {
        await prisma.user.update({
            where: {id: ownerId},
            data: {items: {push: item.id}}
        })

        await prisma.item.update({
            where: {id: itemId},
            data: {
                status : "Dirty",
            }
        })
    } else if (vendor) {
        await prisma.vendor.update({
            where: {id: ownerId},
            data: {inventory: {push: item.id}}
        })
    } else if (station) {
        await prisma.station.update({
            where: {id: ownerId},
            data: {inventory: {push: item.id}}
        })

        await prisma.item.update({
            where: {id: itemId},
            data: {
                status : "Dirty",
            }
        })
    } else if (washer) {
        await prisma.washer.update({
            where: {id: ownerId},
            data: {inventory: {push: item.id}}
        })
    }

    await prisma.item.update({
        where: {id: itemId},
        data: {owner: ownerId}
    })

    return "Item ("+item.id+") owner changed to " + ownerId;
}

module.exports = {
    changeItemOwner
}