const bookinstance = require("../models/bookinstance");
const BookInstance = require("../models/bookinstance");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    return getFirstFiveBookInstance();
  })
  .then((bookInstances) => {
    console.log("Book Instances (5)::", bookInstances);
    console.log("Book Instances Count::", bookInstances.length);
    bookInstances.map((bookInstance) =>
      console.log("Book Instance status::", bookInstance.status)
    );
    mongoose
      .disconnect()
      .then(() => console.log("Disconnected to MongoDB successfully"));
  })
  .catch((err) => {
    console.log("Error Connecting to MongoDB or fetching book instances:", err);
    mongoose
      .disconnect()
      .then(() => console.log("Disconnected to MongoDB successfully"));
  });

const getFirstFiveBookInstance = async () => {
  try {
    //find first five book instances
    const bookInstances = await BookInstance.find()
      .limit(5)
      .populate("book")
      .exec();
    return bookInstances;
  } catch (error) {
    throw new Error("Error fetching bookinstances :" + error.message);
  }
};
