const {prisma} = require("../../../lib/prisma");
const capitalizeFirstLetter = require("../../../util/capitalizeFirstLetter");

async function createItem(name, type, status, owner) {

    if ( capitalizeFirstLetter(name) === "Plate" ) {
        if (capitalizeFirstLetter(type) !== "Halal" && capitalizeFirstLetter(type) !== "Vegetarian" && capitalizeFirstLetter(type) !== "Regular") {
            throw new Error("Invalid or missing type");
        }
    }



    const item = await prisma.item.create({
        data: {
            name: name,
            type: type,
            status: status,
            owner: owner,
            size : capitalizeFirstLetter(name) === "Plate" ? 5 : 2
        }
    });
    return `Item (${item.id}) created successfully`;
}

module.exports = {createItem};