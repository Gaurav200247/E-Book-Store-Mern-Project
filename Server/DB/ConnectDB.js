const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("DB Connected..."))
    .catch(() => console.log("DB Connection Failed !!"));
};

module.exports = connectDB;
