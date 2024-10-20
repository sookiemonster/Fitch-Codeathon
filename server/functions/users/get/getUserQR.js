const {prisma} = require("../../../lib/prisma");

async  function getUserQR(id) {
    return await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            qr: true
        }
    });
}

module.exports = {
    getUserQR
}