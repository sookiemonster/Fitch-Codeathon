const express = require("express");
const router = express.Router();

const registerUser = require("../../functions/authorization/user/signUp");
const loginUser = require("../../functions/authorization/user/signIn");

const vendorRegister = require("../../functions/authorization/vendor/signUp");
const vendorLogin = require("../../functions/authorization/vendor/signIn");

const washerRegister = require("../../functions/authorization/washer/signUp");
const washerLogin = require("../../functions/authorization/washer/signIn");

// POST /api/v1/auth for users

router.post("/users/register", registerUser);

router.post("/users/login", loginUser);

// POST /api/v1/auth for vendors

router.post("/vendors/register", vendorRegister);

router.post("/vendors/login", vendorLogin);

// POST /api/v1/auth/ for washer

router.post("/washers/register", washerRegister);

router.post("/washers/login", washerLogin);

module.exports = router;
