const {prisma} = require("../../../lib/prisma");

async function getDiscountQR(discountId) {
    const discount = await prisma.discount.findUnique({
        where: {
            id: discountId
        },
        select: {
            qr: true
        }
    });
    return (discount);
}

module.exports = {getDiscountQR};