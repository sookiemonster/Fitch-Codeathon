const { prisma } = require("../../../lib/prisma.js");
const bcrypt = require("bcrypt");

const washerRegister = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const vendor = await prisma.washer.findUnique({
    where: {
      email,
    },
  });

  if (vendor) {
    return res.status(409).json({ message: "Washer with this email already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newWasher = await prisma.washer.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res
      .status(201)
      .json({ message: "User created successfully: ", washer: {password, ...newWasher} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error " });
  }
};

module.exports = washerRegister;
