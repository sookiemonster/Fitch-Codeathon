const {prisma} = require("../../../lib/prisma");

async function getItemInfo(id) {
    const item = await prisma.item.findFirst({
        where: {id},
        select: {
            id: true,
            name: true,
            type: true,
            status: true,
            owner: true,
            size : true
        }
    });

    if (!item) {
        item = null;
    }
    return item;
}
module.exports = {getItemInfo};