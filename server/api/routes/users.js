const express = require("express");
const router = express.Router();

const { getUserInfo } = require("../../functions/users/get/getUserInfo.js");
const {
  getUserHistory,
} = require("../../functions/users/get/getUserHistory.js");
const { getUserItems } = require("../../functions/users/get/getUserItems.js");
const {
  getUserDiscounts,
} = require("../../functions/users/get/getUserDiscounts.js");
const { getUserPoints } = require("../../functions/users/get/getUserPoints.js");

const { getUsersSize } = require("../../functions/users/get/getUsersSize.js");

const { addUserItem } = require("../../functions/users/patch/addUserItem.js");
const {
  addToUserHistory,
} = require("../../functions/users/patch/addToUserHistory.js");
const {
  removeUserDiscount,
} = require("../../functions/users/patch/removeUserDiscount.js");
const {
  addUserPoints,
} = require("../../functions/users/patch/addUserPoints.js");
const {
  removeUserPoints,
} = require("../../functions/users/patch/removeUserPoints.js");
const { getUserQR } = require("../../functions/users/get/getUserQR.js");

// GET /api/v1/users

router.get("/size", async (req, res) => {
  try {
    const users = await getUsersSize();
    if (!users) {
      return res.status(404).send({ message: "No users found" });
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  try {
    const user = await getUserInfo(parseInt(id));
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/:id/qr", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  try {
    const user = await getUserQR(parseInt(id));
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/:id/items", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  try {
    const items = await getUserItems(parseInt(id));
    if (!items) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/:id/history", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  try {
    const history = await getUserHistory(parseInt(id));
    if (!history) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(history);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/:id/discounts", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  try {
    const discounts = await getUserDiscounts(parseInt(id));
    if (!discounts) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(discounts);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/:id/points", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  try {
    const points = await getUserPoints(parseInt(id));
    if (!points) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ points });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// PATCH /api/v1/users

router.patch("/:id/items/:item/add", async (req, res) => {
  const { id, item } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  if (!item || isNaN(item)) {
    return res.status(400).send({ message: "Invalid or missing item ID" });
  }
  try {
    await addUserItem(parseInt(id), parseInt(item));
    res
      .status(200)
      .send({
        message: "Item was successfully added to user Current Items list!",
        userId: id,
        itemId: item,
      });
  } catch (error) {
    if (error.message === "Item not found") {
      return res.status(500).send({ message: "Item not found" });
    }

    if (error.message === "Owner not found") {
      return res.status(500).send({ message: "Owner not found" });
    }

    if (error.message === "Item is not fresh") {
      return res.status(500).send({ message: "Item is not clean" });
    }
    res.status(500).send({ message: "Internal server error" });
  }
});

// NOT GONNA DO THIS BC ITS USELESS ENDPOINT
router.patch("/:id/items/:item/remove", (req, res) => {
  res.send("Updating given users items -");
});

router.patch("/:id/history/:item/add", async (req, res) => {
  const { id, item } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  if (!item || isNaN(item)) {
    return res.status(400).send({ message: "Invalid or missing item ID" });
  }

  try {
    await addToUserHistory(parseInt(id), parseInt(item));
    res
      .status(200)
      .send({
        message: "Item was successfully added to user History list!",
        userId: id,
        itemId: item,
      });
  } catch (error) {
    if (error.message === "Item not found") {
      return res.status(404).send({ message: "Item not found" });
    }

    if (error.message === "User not found") {
      return res.status(404).send({ message: "User not found" });
    }

    if (error.message === "Item is not returned") {
      return res.status(400).send({ message: "Item is not returned" });
    }
    res.status(500).send({ message: "Internal server error" });
  }
});

router.patch("/:id/discounts/:discount/add", async (req, res) => {
  const { id, discount } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  if (!discount || isNaN(discount)) {
    return res.status(400).send({ message: "Invalid or missing discount ID" });
  }

  try {
    await addUserDiscount(parseInt(id), parseInt(discount));
    res
      .status(200)
      .send({
        message: "Discount was successfully added to user discounts list!",
        userId: id,
        discountId: discount,
      });
  } catch (error) {
    if (error.message === "Discount not found") {
      return res.status(404).send({ message: "Discount not found" });
    }

    if (error.message === "Not enough points") {
      return res.status(400).send({ message: "Not enough points" });
    }

    if (error.message === "User not found") {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(500).send({ message: "Internal server error" });
  }
});

router.patch("/:id/discounts/:discount/remove", async (req, res) => {
  const { id, discount } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  if (!discount || isNaN(discount)) {
    return res.status(400).send({ message: "Invalid or missing discount ID" });
  }
  try {
    await removeUserDiscount(parseInt(id), parseInt(discount));
    res
      .status(200)
      .send({
        message: "Discount was successfully removed from user discounts list!",
        userId: id,
        discountId: discount,
      });
  } catch (error) {
    if (error.message === "Discount not found") {
      return res.status(404).send({ message: "Discount not found" });
    }

    if (error.message === "User not found") {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(500).send({ message: "Internal server error" });
  }
});

router.patch("/:id/points/add", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const points = req.body.points || null;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  if (!points || isNaN(points)) {
    return res.status(400).send({ message: "Invalid or missing points" });
  }

  try {
    await addUserPoints(parseInt(id), parseInt(points));
    res
      .status(200)
      .send({
        message: "Points were successfully added to user points list!",
        userId: id,
      });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(500).send({ message: "Internal server error" });
  }
});

router.patch("/:id/points/remove", async (req, res) => {
  const { id } = req.params;
  const points = req.body.points;

  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing ID" });
  }
  if (!points || isNaN(points)) {
    return res.status(400).send({ message: "Invalid or missing points" });
  }

  try {
    await removeUserPoints(parseInt(id), parseInt(points));
    res
      .status(200)
      .send({
        message: "Points were successfully removed from user points list!",
        userId: id,
      });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).send({ message: "User not found" });
    }
    if (error.message === "Not enough points") {
      return res.status(404).send({ message: "Not enough points" });
    }
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
