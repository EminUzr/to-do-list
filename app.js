const express = require("express");
const app = express();
const router = require("./routes/route.js");
const connectDB = require("./loaders/mongo.js");
const dotenv = require("dotenv");

dotenv.config();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", router);
app.use("/delete", router);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT + ".");
});
