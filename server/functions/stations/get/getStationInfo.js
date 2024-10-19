const {prisma} = require("../../../lib/prisma");

async function getStationInfo(id) {
    const station = await prisma.station.findUnique({
        where: { id: id },
    });
    return station;
}

module.exports = { getStationInfo }