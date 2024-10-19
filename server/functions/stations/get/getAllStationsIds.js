const {prisma} = require("../../../lib/prisma");


async function getAllStationsIds() {
    const stations = await prisma.station.findMany({
        select: {
            id: true
        }
    });

    const size = stations.length;
    return {...stations, size};
}

module.exports = { getAllStationsIds }