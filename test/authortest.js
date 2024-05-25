const mongoose = require("mongoose");

const Author = require("../models/author");
require("dotenv").config();

const { MONGO_URL } = process.env;
async function main() {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB"));

  const newAuthor = new Author({
    first_name: "John",
    family_name: "Doe",
  });

  await newAuthor.save();

  const author = await Author.findById(newAuthor._id).exec();
  console.log("Author::", author);
  console.log("Author's ID::", author.id);

  console.log("Author's full name::", author.name);
  console.log("Author's URL::", author.url);

  // remove the author
  await Author.deleteOne({ _id: newAuthor._id });

  // verify delete
  const deletedAuthor = await Author.findById(newAuthor._id).exec();
  if (!deletedAuthor) {
    console.log("Author deleted successfully");
  }

  await mongoose.disconnect();
}

main().catch((err) => console.log(err));
