const {prisma} = require("../../../lib/prisma");

async function getItemName(id) {

    const item = await prisma.item.findUnique({
        where: {id},
        select: {
            name: true
        }
    });

    if (!item) {
        item = null;
    }

    return item;
}

module.exports = {getItemName}