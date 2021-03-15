const express = require("express");
const app = express();
const config = require("../config.json");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app
  .listen(config.website.port, config.website.ip, function () {
    console.log(`Server up on ${config.ip}:${config.port}!`);
  })
  .on("error", console.error);
