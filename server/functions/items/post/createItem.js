const {prisma} = require("../../../lib/prisma");
const capitalizeFirstLetter = require("../../../util/capitalizeFirstLetter");
const makeQR = require("../../../util/makeQR");

async function createItem(name, type, status, owner) {

    if ( capitalizeFirstLetter(name) === "Plate" ) {
        if (capitalizeFirstLetter(type) !== "Halal" && capitalizeFirstLetter(type) !== "Vegetarian" && capitalizeFirstLetter(type) !== "Regular") {
            throw new Error("Invalid or missing type");
        }
    }



    const item = await prisma.item.create({
        data: {
            qr: 1,
            name: name,
            type: type,
            status: status,
            owner: owner,
            size : capitalizeFirstLetter(name) === "Plate" ? 5 : 2
        }
    });

    await prisma.item.update({
        where: {id: item.id},
        data: {qr: await makeQR(item.id+"")}
    })
    return `Item (${item.id}) created successfully`;
}

module.exports = {createItem};