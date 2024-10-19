const {prisma} = require("../../../lib/prisma");

async function getItemType(id) {

    const item = await prisma.item.findUnique({
        where: {id},
        select: {
            type: true
        }
    });

    if (!item) {
        item = null;
    }

    return item;
}

module.exports = {getItemType}