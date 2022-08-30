const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/todolistDB", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB connected.");
    }
  });
};

module.exports = connectDB;
