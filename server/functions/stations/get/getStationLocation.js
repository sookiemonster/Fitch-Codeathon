const {prisma} = require("../../../lib/prisma");

async function getStationLocation(id) {
    const station = await prisma.station.findUnique({
        where: { id: id },
        select: {
            x: true,
            y: true
        }
    });
    return station;
}

module.exports = { getStationLocation }