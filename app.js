const express = require("express");
const app = express();
const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect("mongodb://localhost:27017/todolistDB", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB connected.");
  }
});

const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

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

const listsSchema = new mongoose.Schema({
  name: String,
  list: [itemsSchema],
});

const List = mongoose.model("List", listsSchema);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  Item.find({}, (err, result) => {
    res.render("list", { result: result, listTitle: "Today" });
  });
});

app.get("/:direction", (req, res) => {
  List.findOne(
    { name: _.capitalize(req.params.direction) },
    (err, foundList) => {
      if (err) {
        console.log(err);
      }
      if (!foundList) {
        new List({
          name: _.capitalize(req.params.direction),
          list: defaultItems,
        }).save(() => {
          res.redirect("/" + _.capitalize(req.params.direction));
        });
      } else {
        res.render("list", {
          listTitle: _.capitalize(req.params.direction),
          result: foundList.list,
        });
      }
    }
  );
});

app.post("/", (req, res) => {
  if (req.body.button === "Today") {
    new Item({ name: req.body.newItem }).save();
    res.redirect("/");
  } else {
    List.findOne({ name: req.body.button }, (err, r) => {
      r.list.push(new Item({ name: req.body.newItem }));
      r.save();
      res.redirect("/" + req.body.button);
    });
  }
});

app.post("/delete", (req, res) => {
  if (req.body.listT === "Today") {
    Item.findById(req.body.checkbox, (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate(
      { name: req.body.listT },
      { $pull: { list: { _id: req.body.checkbox } } },
      (err, foundList) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/" + _.capitalize(req.body.listT));
        }
      }
    );
  }
});

app.listen(1997, () => {
  console.log("Server is running on port 1997.");
});
