const mongoose = require("mongoose");
const { itemsSchema } = require("./model.item.js");

const listsSchema = new mongoose.Schema({
  name: String,
  list: [itemsSchema],
});

const List = mongoose.model("List", listsSchema);

module.exports = List;
