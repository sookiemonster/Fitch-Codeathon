const { prisma } = require("../../../lib/prisma");

async function addStationInventory(stationId, itemId) {
  try {
    
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    // CHECK THE CURRENT OWNER
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

    console.log(userOwner, vendorOwner, washerOwner, stationOwner);

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

      const historyItem = {
        id: itemId,
        timestamp: new Date(),
      }
      await prisma.user.update({
        where: { id: userOwner.id },
        data: { history: { push: historyItem } },
      });
    } else if (ownerType === "vendor") {
      await prisma.vendor.update({
        where: { id: vendorOwner.id },
        data: { inventory: { set: vendorOwner.inventory.filter((i) => i !== itemId) } },
      });
    } else if (ownerType === "washer") {
      await prisma.washer.update({
        where: { id: washerOwner.id },
        data: { inventory: { set: washerOwner.inventory.filter((i) => i !== itemId) } },
      });
    } else if (ownerType === "station") {
      await prisma.station.update({
        where: { id: stationOwner.id },
        data: { inventory: { set: stationOwner.inventory.filter((i) => i !== itemId) } },
      });
    }

    // ADD IT TO THE STATIONS AND CHANGE THE STATUS
    await prisma.station.update({
      where: { id: stationId },
      data: { inventory: { push: itemId } },
    });

    await prisma.item.update({
      where: { id: itemId },
      data: { owner: stationId },
    });

    return { message: "Item successfully added to stations inventory and status updated to Dirty" };
  } catch (error) {
    console.error(error);
    throw error;
    
  }
}

module.exports = { addStationInventory };
