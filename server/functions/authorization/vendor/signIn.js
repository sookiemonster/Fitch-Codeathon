const { prisma } = require("../../../lib/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const washerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const washer = await prisma.washer.findUnique({
      where: { email },
    });
    if (!washer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, washer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const washerWithoutPassword = {
      ...washer,
      password: undefined,
    };

    //Payload to bring to frontend through token
    const payload = {
      id: washer.id,
      role: "washer",
    };
    //Creation of token
    const token = jwt.sign(payload, "uGeL7Mey5tp1KVg", {
      expiresIn: "3d",
    });

    res
      .status(200)
      .json({ message: `Login successful, welcome ${washer.email}!`, washerWithoutPassword, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = washerLogin;
