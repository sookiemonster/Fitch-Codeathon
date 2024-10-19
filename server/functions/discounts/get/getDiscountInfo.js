const {prisma} = require("../../../lib/prisma");

async function getDiscountInfo(id) {
    const discount = await prisma.discount.findUnique({
        where: {id: id},
    })

    if (!discount) {
        return null;
    }

    return discount
}

module.exports = {getDiscountInfo}