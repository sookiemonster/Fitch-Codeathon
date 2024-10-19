const { prisma } = require("../../../lib/prisma");

async function addUserPoints(id, points) {

    const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
            points: true
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    await prisma.user.update({
        where: { id: id },
        data: { points: user.points + points }
    });

}

module.exports = { addUserPoints };