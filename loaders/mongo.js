const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB connected.");
    }
  });
};

module.exports = connectDB;
