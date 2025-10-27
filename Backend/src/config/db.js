const mongoose = require("mongoose");


exports.connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Database connection failed", err);
    });
};
