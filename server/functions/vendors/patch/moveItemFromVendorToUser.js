const {prisma} = require("../../../lib/prisma");

const {getUserInfo} = require("../../users/get/getUserInfo");
const {getVendorInfo} = require("../../vendors/get/getVendorInfo");

async function moveItemFromVendorToUser(vendorId, itemId, userId) {
    try {
        const item = await prisma.item.findUnique({
            where: { id: itemId },
        });


        const vendor = await getVendorInfo(vendorId);

        const user = await getUserInfo(userId);

        if (!user) {
            throw new Error("User not found");
        }

        if (!vendor) {
            throw new Error("Vendor not found");
        }

        if (!item) {
            throw new Error("Item not found");
        }

        if (item.owner !== vendorId) {
            throw new Error("This item is not owned by this vendor");
        }

        await prisma.vendor.update({
            where: { id: vendorId },
            data: { inventory: { set: vendor.inventory.filter((i) => i !== itemId) } },
          });

        await prisma.item.update({
            where: { id: itemId },
            data: { status: "Dirty", owner: userId },
        });

        await prisma.user.update({
            where: { id: userId },
            data: { items: { push: itemId } },
        });


    } catch (error) {
        throw error;
    }
}

module.exports = { moveItemFromVendorToUser }