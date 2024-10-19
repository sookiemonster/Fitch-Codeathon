const { prisma } = require("../../../lib/prisma.js");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Find by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    //If not found then show error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password " });
    }
    //Compare if password and hashed password in database is a match
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //If everything checks out then return success
    res.status(200).json({ message: "Login successful, welcome: ", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = loginUser;
