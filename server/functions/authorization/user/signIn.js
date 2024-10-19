const { prisma } = require("../../../lib/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password " });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //Determine role based on ID
    //Note: Have to edit database IDs to have the prefix correspond to their role
    const idPrefix = user.id.charAt(0);
    let role = "user"; //Default role assuming washers and vendor will have pre-created/set accounts and do not need to go through signup (email&pw)

    if (idPrefix === "W") {
      role = "washer";
    } else if (idPrefix === "V") {
      role = "vendor";
    }
    //Payload to bring to frontend through token
    const payload = {
      id: user.id,
      role: role,
    };
    //Creation of token
    const token = jwt.sign(payload, "uGeL7Mey5tp1KVg", {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: `Login successful, welcome ${role}!`, user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = loginUser;
