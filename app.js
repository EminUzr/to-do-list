const express = require("express");
const app = express();
const connectDB = require("./loaders/mongo.js");
const {
  getMainPage,
  getSpecificPage,
  postItem,
  deleteItem,
} = require("./services/service");

connectDB();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", getMainPage);

app.get("/:direction", getSpecificPage);

app.post("/", postItem);

app.post("/delete", deleteItem);

app.listen(1997, () => {
  console.log("Server is running on port 1997.");
});
