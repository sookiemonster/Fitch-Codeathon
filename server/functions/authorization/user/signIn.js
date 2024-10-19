const { prisma } = require("../../../lib/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userWithoutPassword = {
      ...user,
      password: undefined,
    };

    //Payload to bring to frontend through token
    const payload = {
      id: user.id,
      role: "user",
    };
    //Creation of token
    const token = jwt.sign(payload, "uGeL7Mey5tp1KVg", {
      expiresIn: "7d",
    });

    res
      .status(200)
      .json({ message: `Login successful, welcome ${user.email}!`, userWithoutPassword, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = loginUser;
