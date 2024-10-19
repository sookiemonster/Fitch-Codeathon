const { prisma } = require("../../../lib/prisma");

async function getUserPoints(id) {

    const points = await prisma.user.findUnique({
        where: { id: id },
        select: {
            points: true,
        },
    });
    
    if (!points) {
        return null;
    }

    return points;

}


module.exports = { getUserPoints };