const {prisma} = require("../../../lib/prisma");

async function getItemStatus(id) {

    const item = await prisma.item.findUnique({
        where: {id},
        select: {
            status: true
        }
    });

    if (!item) {
        item = null;
    }

    return item;
}

module.exports = {getItemStatus}