const mongoose = require("mongoose");

const Book = require("../models/book");

require("dotenv").config();

const mongoDB = process.env.MONGO_URL;

async function main() {
  await mongoose
    .connect(mongoDB)
    .then(() => console.log("Connected to MongoDB"));

  // create new book
  const newBook = new Book({
    title: "Moon walking with Einstein",
  });
}
