const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const uri =
      "mongodb+srv://testingdeveloper540:oD7lluZNUdOGMemI@todos.mqurq.mongodb.net/todos";
    await mongoose.connect(uri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
