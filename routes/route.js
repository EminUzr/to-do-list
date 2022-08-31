const express = require("express");
const router = express.Router();

const {
  getMainPage,
  getSpecificPage,
  postItem,
  deleteItem,
} = require("../controllers/controller.js");

router.get("/", getMainPage);

router.get("/:direction", getSpecificPage);

router.post("/", postItem);

router.post("/delete", deleteItem);

module.exports = router;
