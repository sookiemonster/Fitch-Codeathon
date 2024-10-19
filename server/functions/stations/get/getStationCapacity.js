const {prisma} = require("../../../lib/prisma");

async function getStationCapacity(id) {
    const station = await prisma.station.findUnique({
        where: { id: id },
        select: {
            capacity: true
        }
    });
    return station;
}

module.exports = { getStationCapacity }