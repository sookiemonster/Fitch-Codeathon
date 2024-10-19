const {prisma} = require("../../../lib/prisma");

async function deleteDiscount(discountId) {

    const discount = await prisma.discount.findUnique({
        where: {
            id: discountId
        }
    });
    
    if (!discount) {
        throw new Error("Discount not found");
    }  

    await prisma.discount.delete({
        where: {
            id: discountId
        }
    });
    return discount.id;
}

module.exports = {deleteDiscount};