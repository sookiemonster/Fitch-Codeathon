const {prisma} = require("../../../lib/prisma");

async function getDiscounts() {
    const discounts = await prisma.discount.findMany();
    return discounts;
}

module.exports = { getDiscounts }