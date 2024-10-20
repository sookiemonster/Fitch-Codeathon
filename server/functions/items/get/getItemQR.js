const {prisma} = require("../../../lib/prisma");

async  function getItemQR(id) {
    return await prisma.item.findUnique({
        where: {
            id: id
        },
        include: {
            qr: true
        }
    });
}

module.exports = {
    getItemQR
}