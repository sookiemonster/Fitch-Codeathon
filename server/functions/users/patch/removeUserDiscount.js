const { prisma } = require("../../../lib/prisma");
const { getUserDiscounts } = require("../get/getUserDiscounts");

async function removeUserDiscount(id, discountId) {

    const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
            id: true,
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
        data: { discounts: { set: user.discounts.filter((i) => i !== discountId) } },
    });

}

module.exports = { removeUserDiscount }