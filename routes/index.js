var express = require("express");
var router = express.Router();

/* GET home page. */

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", messages: messages });
});

router.get("/new", (req, res, next) => {
  res.render("new");
});

router.post("/new", (req, res, next) => {
  const { user, text } = req.body;
  console.log("Form data: ", { user, text });
  messages.push({ text: text, user: user, added: new Date() });
  res.redirect("/");
});

module.exports = router;
