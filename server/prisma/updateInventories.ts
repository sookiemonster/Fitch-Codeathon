const { prisma } = require("../lib/prisma.js");
async function updateOwnerInventories() {
  // GET ALL ITEMS
  const serviceware = await prisma.item.findMany()
  
  // LOOP THROUGH ALL ITEMS AND APPEND TO OWNERS 
  for (const item of serviceware) {
    // CHECK THE IF THE ITEM BELONGS TO A VENDOR
    if (item.owner === 21 || item.owner === 22 || item.owner === 23 || item.owner === 24 || item.owner === 25) {
      await prisma.vendor.update({
        where: { id: item.owner },
        data: {
          inventory: {
            push: item.id // ADD TO OWNER'S INVENTORY
          }
        }
      })
    }
  
    // CHECK IF THE ITEM BELONGS TO A STATION
    if (item.owner === 1 || item.owner === 2 || item.owner === 3) {
      await prisma.station.update({
        where: { id: item.owner },
        data: {
          inventory: {
            push: item.id // ADD TO OWNER'S INVENTORY
          }
        }
      })
    }
  
    // CHECK IF THE ITEM BELONGS TO A WASHER
    if (item.owner === 31 || item.owner === 32 || item.owner === 33) {
      await prisma.user.update({
        where: { id: item.owner },
        data: {
            items: {
            push: item.id // ADD TO OWNER'S INVENTORY
          }
        }
      })
    }
  }
  
  console.log("Owner inventories updated successfully!")
}

updateOwnerInventories()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })