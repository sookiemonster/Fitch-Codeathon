const {prisma} = require("../../lib/prisma");
const { fetchDetailedInventory } = require("../vendors/util/fetchInventory");

async function getMetrics() {
    const metrics = await prisma.item.findMany();

    const stations = await prisma.station.findMany({
        select: {
            id: true,
            inventory: true
        }
    });
        
    let totalItems = 0;
    let totalCups = 0;
    let totalPlates = 0;
    let totalHalal = 0;
    let totalVeg = 0;
    let totalReg = 0;
    let totalCleanPlates = 0;
    let totalDirtyPlates = 0;
    let totalCleanCups = 0;
    let totalDirtyCups = 0;
    let totalHalalDirty = 0;
    let totalHalalClean = 0;
    let totalVegDirty = 0;
    let totalVegClean = 0;
    let totalRegDirty = 0;
    let totalRegClean = 0;

    metrics.forEach(item => {
        totalItems++;

        if (item.name === "Cup") {
            totalCups++;
            if (item.status === "Fresh") {
                totalCleanCups++;
            } else {
                totalDirtyCups++;
            }
        }
        if (item.name === "Plate") {
            totalPlates++;

            if (item.status === "Fresh") {
                totalCleanPlates++;
            }

            if (item.status === "Dirty") {
                totalDirtyPlates++;
            }
            if (item.type === "Halal") {
                totalHalal++;
                if (item.status === "Fresh") {
                    totalHalalClean++;
                } else {
                    totalHalalDirty++;
                }
            }  
            if (item.type === "Vegetarian") {
                totalVeg++;
                if (item.status === "Fresh") {
                    totalVegClean++;
                } else {
                    totalVegDirty++;
                }
            }  
            if (item.type === "Regular") {
                totalReg++;
                if (item.status === "Fresh") {
                    totalRegClean++;
                } else {
                    totalRegDirty++;
                }
            }
            
        }
    });

    let totalPlatesInStations = 0;
let totalCupsInStations = 0;
let totalHalalInStations = 0;
let totalVegInStations = 0;
let totalRegInStations = 0;

for (const station of stations) {
    const stationInventory = await fetchDetailedInventory(station.id);

    if (!stationInventory) {
        continue;
    }
    
    totalPlatesInStations += stationInventory.plates;
    totalCupsInStations += stationInventory.cups;
    console.log(stationInventory.cups);
    totalHalalInStations += stationInventory.halal;
    totalVegInStations += stationInventory.veg;
    totalRegInStations += stationInventory.reg;
}

    return {
        counts : {
            all : {
                unwashed : {
                    total : totalDirtyCups + totalDirtyPlates,
                    plates : totalDirtyPlates,
                    cups : totalDirtyCups
                },
                washed : {
                    total : totalCleanCups + totalCleanPlates,
                    plates : totalCleanPlates,
                    cups : totalCleanCups
                },
                uncollected : {
                    plates : totalPlatesInStations,
                    cups : totalCupsInStations
                }
            },
            vegan : {
                unwashed : {
                    plates : totalVegDirty,
                },
                washed : {
                    plates : totalVegClean,
                },
                uncollected : {
                    plates : totalVegInStations
                }
            },
            halal : {
                unwashed : {
                    plates : totalHalalDirty,
                },
                washed : {
                    plates : totalHalalClean,
                },
                uncollected : {
                    plates : totalHalalInStations
                }
            },
            regular : {
                unwashed : {
                    plates : totalRegDirty,
                },
                washed : {
                    plates : totalRegClean,
                },
                uncollected : {
                    plates : totalRegInStations
                }
            }
        }
    }  
}
    

module.exports = { getMetrics };