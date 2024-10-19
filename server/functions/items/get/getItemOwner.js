const {prisma} = require("../../../lib/prisma");

async function getItemOwner(id) {

    const item = await prisma.item.findUnique({
        where: {id},
        select: {
            owner: true
        }
    });

    if (!item) {
        item = null;
    }

    return item;
}

module.exports = {getItemOwner}