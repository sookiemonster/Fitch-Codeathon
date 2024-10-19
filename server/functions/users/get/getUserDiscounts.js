const { prisma } = require("../../../lib/prisma");

async function getUserDiscounts(id) {

    const discounts = await prisma.user.findUnique({
        where: { id: id },
        select: {
            discounts: true,
        },
    });
    
    if (!discounts) {
        return null;
    }

    return discounts;

}


module.exports = { getUserDiscounts };