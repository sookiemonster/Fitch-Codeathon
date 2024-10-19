const {prisma} = require("../../../lib/prisma");

async function createDiscount(cost,reward) {
    const discount = await prisma.discount.create({
        data: {
            cost: cost,
            reward: reward
        }
    })

    return "Discount(id = " + discount.id + ") was created successfully!";
}

module.exports = {createDiscount}