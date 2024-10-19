const { prisma } = require("../../../lib/prisma");

async function getUserHistory(id) {

    const history = await prisma.user.findUnique({
        where: { id: id },
        select: {
            history: true,
        },
    });
    
    if (!history) {
        return null;
    }

    return history;

}


module.exports = { getUserHistory };