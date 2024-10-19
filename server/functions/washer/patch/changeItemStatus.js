const {prisma} = require("../../../lib/prisma");
const capitalizeFirstLetter = require("../../../util/capitalizeFirstLetter");
async function changeItemStatus(washerId, itemId, status = null) {

    const washer = await prisma.washer.findUnique({
        where: { id: washerId },
    });

    if (!washer) {
        throw new Error("Washer not found");
    }

    const item = await prisma.item.findUnique({
        where: { id: itemId },
    });

    if (!item) {
        throw new Error("Item not found");
    }

    if (item.owner !== washerId) {
        throw new Error("This item is not owned by this washer");
    }

    if (!status) {

        if (item.status === "Dirty") {
            await prisma.item.update({
                where: { id: itemId },
                data: { status: "Fresh" },
            });
            return "Item status changed to Clean";
        }
        if (item.status === "Fresh") {
            await prisma.item.update({
                where: { id: itemId },
                data: { status: "Dirty" },
            });
            return "Item status changed to Dirty";
        }
    }

    if (capitalizeFirstLetter(item.status) === "Fresh" || capitalizeFirstLetter(item.status) === "Dirty") {

        await prisma.item.update({
            where: { id: itemId },
            data: { status: status },
        });

    return "Item status changed to " + status;
    }

    throw new Error("Invalid status");

}

module.exports = {changeItemStatus};