const { Item } = require("../models/model.item");
const List = require("../models/model.list.js");
const _ = require("lodash");
const {
  getMainPageService,
  getSpecificPageService,
  postItemService,
  deleteItemService,
} = require("../services/service");

const getMainPage = async (req, res) => {
  const items = await getMainPageService();
  if (items === false) {
    res.redirect("/");
  } else {
    res.render("list", { result: items, listTitle: "Today" });
  }
};

const getSpecificPage = async (req, res) => {
  const listName = req.params.direction;
  const item = await getSpecificPageService(listName);
  if (!item) {
    res.redirect("/" + _.capitalize(listName));
  } else
    res.render("list", {
      listTitle: _.capitalize(listName),
      result: item.list,
    });
};

const postItem = async (req, res) => {
  const listName = req.body.button;
  const newItemText = req.body.newItem;
  const result = await postItemService(listName, newItemText);
  if (!result) {
    res.redirect("/");
  } else {
    res.redirect("/" + req.body.button);
  }
};

const deleteItem = async (req, res) => {
  const listName = req.body.listT;
  const itemId = req.body.checkbox;
  const result = await deleteItemService(listName, itemId);
  if (!result) {
    res.redirect("/");
  } else {
    res.redirect("/" + listName);
  }
};

module.exports = { getMainPage, getSpecificPage, postItem, deleteItem };
