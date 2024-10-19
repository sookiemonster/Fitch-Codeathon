const { prisma } = require("../../../lib/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const vendor = await prisma.vendor.findUnique({
      where: { email },
    });
    if (!vendor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const vendorWithoutPassword = {
      ...vendor,
      password: undefined,
    };

    //Payload to bring to frontend through token
    const payload = {
      id: vendor.id,
      role: "vendor",
    };
    //Creation of token
    const token = jwt.sign(payload, "uGeL7Mey5tp1KVg", {
      expiresIn: "3d",
    });

    res
      .status(200)
      .json({ message: `Login successful, welcome ${vendor.email}!`, vendorWithoutPassword, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = vendorLogin;
