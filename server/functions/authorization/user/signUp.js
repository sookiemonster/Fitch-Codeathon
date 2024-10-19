const { prisma } = require("../../../lib/prisma.js");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res
      .status(201)
      .json({ message: "User created successfully: ", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error " });
  }
};

module.exports = registerUser;
