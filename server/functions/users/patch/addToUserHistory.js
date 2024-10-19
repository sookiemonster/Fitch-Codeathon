const { prisma } = require("../../../lib/prisma");
const { getUserInfo } = require("../get/getUserInfo");

async function addToUserHistory(id, itemId) {

    const user = await getUserInfo(id);

    const item = await prisma.item.findUnique({
        where: { id: itemId },
        select: {
            id: true
        }
    });

    if (user.items.includes(itemId)) {
        throw new Error("Item is not returned");
    }

    if (!item) {
        throw new Error("Item not found");
    }

    if (!user) {
        throw new Error("User not found");
    }

    await prisma.user.update({
        where: { id: id },
        data: { history: { push: itemId } }
    });
}

module.exports = { addToUserHistory };