const { prisma } = require("../lib/prisma.js");
async function updateOwnerInventories() {
    // Fetch all serviceware items
    const serviceware = await prisma.item.findMany()
  
    // Loop over each item and update the owner's inventory
    for (const item of serviceware) {
      // Check if the item belongs to a vendor
      if (item.owner === 21 || item.owner === 22 || item.owner === 23 || item.owner === 24 || item.owner === 25) {
        await prisma.vendor.update({
          where: { id: item.owner },
          data: {
            inventory: {
              push: item.id // Append the item ID to the vendor's inventory
            }
          }
        })
      }
  
      // Check if the item belongs to a station (e.g., with an ID starting with 1)
      if (item.owner === 1 || item.owner === 2 || item.owner === 3) {
        await prisma.station.update({
          where: { id: item.owner },
          data: {
            inventory: {
              push: item.id // Append the item ID to the station's inventory
            }
          }
        })
      }
  
      // Check if the item belongs to a user (e.g., with an ID starting with 3)
      if (item.owner === 31 || item.owner === 32 || item.owner === 33) {
        await prisma.user.update({
          where: { id: item.owner },
          data: {
              items: {
              push: item.id // Append the item ID to the user's inventory
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