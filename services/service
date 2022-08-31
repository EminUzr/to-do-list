const { Item } = require("../models/model.item");
const List = require("../models/model.list.js");
const _ = require("lodash");

const item1 = new Item({
  name: "Welcome to your todolist!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});
const defaultItems = [item1, item2, item3];

const getMainPageService = async () => {
  const result = await Item.find({});
  if (result.length === 0) {
    Item.insertMany(defaultItems);
    return false;
  } else {
    return result;
  }
};

const getSpecificPageService = async (listName) => {
  const foundItem = await List.findOne({ name: _.capitalize(listName) });
  if (!foundItem) {
    new List({
      name: _.capitalize(listName),
      list: defaultItems,
    }).save();
    return false;
  } else {
    return foundItem;
  }
};

const postItemService = async (listName, newItemText) => {
  if (listName === "Today") {
    new Item({ name: newItemText }).save();
    return false;
  } else {
    const specificList = await List.findOne({ name: listName });
    specificList.list.push(new Item({ name: newItemText }));
    specificList.save();
    return specificList;
  }
};

const deleteItemService = (listName, itemId) => {
  if (listName === "Today") {
    Item.deleteOne({ _id: itemId }).exec();
    return false;
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { list: { _id: itemId } } }
    ).exec();
    return true;
  }
};

module.exports = {
  getMainPageService,
  getSpecificPageService,
  postItemService,
  deleteItemService,
};
