const {prisma} = require("../../../lib/prisma");
const {fetchDetailedInventory} = require("../../vendors/util/fetchInventory");
async function getWasherInventory(id) {
    const inventory = await prisma.washer.findUnique({
        where: {
            id: id
        },
        select: {
            inventory: true
        }
    });

    const size = inventory.inventory.length;

    const {cups, plates, halal, veg, reg, halalClean, halalDirty, vegClean, vegDirty, regClean, regDirty, cleanCups, dirtyCups, cleanPlates, dirtyPlates} = await fetchDetailedInventory(id);

    if (inventory.length === 0) {
        return 0;
    }

    if (!inventory) {
        return null;
    }

    return {...inventory, name : {
        cups : { total : cups, 
            status : { 
                clean : cleanCups, dirty : dirtyCups 
            }
        },
        plates : { total : plates, 
            type : {
                halal : { total : halal, status : { clean : halalClean, dirty : halalDirty } },
                vegetarian : { total : veg, status : { clean : vegClean, dirty : vegDirty } },
                regular : { total : reg, status : { clean : regClean, dirty : regDirty } }
            },
            status : { 
                clean : cleanPlates, 
                dirty : dirtyPlates 
            }
        },

        size : size
        
    }};
}

module.exports = {getWasherInventory};