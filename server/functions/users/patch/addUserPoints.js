const { prisma } = require("../../../lib/prisma");
const { getUserPoints } = require("../get/getUserPoints");
async function addUserPoints(id, points) {

    const user = await getUserPoints(id);

    if (!user) {
        throw new Error("User not found");
    }

    await prisma.user.update({
        where: { id: id },
        data: { points: user.points + points }
    });

}

module.exports = { addUserPoints };