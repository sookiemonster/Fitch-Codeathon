const {prisma} = require("../../../lib/prisma");
const capitalizeFirstLetter = require("../../../util/capitalizeFirstLetter");

async function changeItemStatus(itemId, status) {

    const item = await prisma.item.findUnique({
        where: {id: itemId}
    })

    if (!item) {
        throw new Error("Item not found")
    }
    await prisma.item.update({
        where: {id: itemId},
        data: {status: capitalizeFirstLetter(status)}
    })

    return "Item ("+item.id+") status changed to " + capitalizeFirstLetter(status);
}

module.exports = {changeItemStatus};