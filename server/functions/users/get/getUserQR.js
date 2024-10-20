const {prisma} = require("../../../lib/prisma");

async  function getUserQR(id) {
    return await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            qr: true
        }
    });
}

module.exports = {
    getUserQR
}