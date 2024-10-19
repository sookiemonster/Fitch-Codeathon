const {prisma} = require("../../../lib/prisma");

async function getUsersSize() {
    const users = await prisma.user.findMany({
        select: {
            id: true
        }
    });

    const size = users.length;
    return {size};
}

module.exports = {getUsersSize}