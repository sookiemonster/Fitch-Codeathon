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

    let ownerType = null;
    let ownerInventoryField = null;
    
    const userOwner = await prisma.user.findFirst({
      where: { items: { has: itemId } },
    });
    const vendorOwner = await prisma.vendor.findFirst({
      where: { inventory: { has: itemId } },
    });
    const washerOwner = await prisma.washer.findFirst({
      where: { inventory: { has: itemId } },
    });
    const stationOwner = await prisma.station.findFirst({
      where: { inventory: { has: itemId } },
    });

    //console.log(userOwner, vendorOwner, washerOwner, stationOwner);

    if (userOwner) {
      ownerType = "user";
      ownerInventoryField = "items";
    } else if (vendorOwner) {
      ownerType = "vendor";
      ownerInventoryField = "inventory";
    } else if (washerOwner) {
      ownerType = "washer";
      ownerInventoryField = "inventory";
    } else if (stationOwner) {
      ownerType = "station";
      ownerInventoryField = "inventory";
    }

    if (!ownerType) {
      throw new Error("Owner not found");
    }

    // REMOVE IT FROM THE CURRENT OWNER'S INVENTORY
    if (ownerType === "user") {
      await prisma.user.update({
        where: { id: userOwner.id },
        data: { items: { set: userOwner.items.filter((i) => i !== itemId) } },
      });
    } else if (ownerType === "vendor") {
      await prisma.vendor.update({
        where: { id: vendorOwner.id },
        data: { inventory: { set: vendorOwner.inventory.filter((i) => i !== itemId) } },
      });
    } else if (ownerType === "station") {
      await prisma.station.update({
        where: { id: stationOwner.id },
        data: { inventory: { set: stationOwner.inventory.filter((i) => i !== itemId) } },
      });
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