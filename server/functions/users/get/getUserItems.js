const { prisma } = require("../../../lib/prisma");

async function getUserItems(id) {

    const items = await prisma.user.findUnique({
        where: { id: id },
        select: {
            items: true,
        },
    });
    
    if (!items) {
        return null;
    }

    return items;

}


module.exports = { getUserItems };