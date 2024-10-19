const { prisma } = require("../../../lib/prisma");

async function addUserDiscount(id, discountId) {

    const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
            discounts: true
        }
    });

    const discount = await prisma.discount.findUnique({
        where: { id: discountId },
        select: {
            id: true
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (!discount) {
        throw new Error("Discount not found");
    }

    await prisma.user.update({
        where: { id: id },
        data: { discounts: { push: discountId } },
    });

}

module.exports = { addUserDiscount };