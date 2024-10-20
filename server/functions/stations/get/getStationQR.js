const {prisma} = require("../../../lib/prisma");

async  function getStationQR(id) {
    return await prisma.station.findUnique({
        where: {
            id: id
        },
        include: {
            qr: true
        }
    });
}

module.exports = {
    getStationQR
}