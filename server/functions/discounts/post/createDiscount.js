const {prisma} = require("../../../lib/prisma");
const makeQR = require("../../../util/makeQR.js");
async function createDiscount(cost,reward) {
    const discount = await prisma.discount.create({
        data: {
            cost: cost,
            reward: reward,
            qr : "1"
        }
    })

    await prisma.discount.update({
        where: {
            id: discount.id
        },
        data: {
            qr: await makeQR(discount.id+"")
        }
    })

    return "Discount(id = " + discount.id + ") was created successfully!";
}

module.exports = {createDiscount}