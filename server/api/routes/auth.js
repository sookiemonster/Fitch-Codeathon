const express = require("express");
const router = express.Router();
const registerUser = require("../../functions/authorization/user/signUp");
const loginUser = require("../../functions/authorization/user/signIn");

// POST /api/v1/auth for users

router.post("/users/register", registerUser);

router.post("/users/login", loginUser);

// POST /api/v1/auth for vendors

router.post("/vendors/register", (req, res) => {
  res.send("Making new vendor account");
});

router.post("/vendors/login", (req, res) => {
  res.send("Logging in vendor");
});

module.exports = router;
