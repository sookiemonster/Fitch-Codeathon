const { prisma } = require("../../../lib/prisma.js");
const bcrypt = require("bcrypt");
const makeQR = require("../../../util/makeQR.js");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(409).json({ message: "User with this email already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        qr : 1
      },
    });
    await prisma.user.update({
      where: {
        id: newUser.id
      },
      data: {
        qr: await makeQR(newUser.id+"")
      }
    })
    res
      .status(201)
      .json({ message: "User created successfully: ", user: {password, ...newUser} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error " });
  }
};

module.exports = registerUser;
