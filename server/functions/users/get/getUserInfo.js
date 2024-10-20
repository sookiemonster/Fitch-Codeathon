const { prisma } = require("../../../lib/prisma");

async function getUserInfo(id) {

    const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
            id: true,
            name: true,
            email: true,
            name: true,
            points: true,
            discounts: true,
            items: true,
            history: true,
            qr: true
            
        },
    });

    if (!user) {
        return null;
    }

    return user;
}


module.exports = { getUserInfo };