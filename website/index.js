const express = require("express");
const logger = require('../bot/utilities/logger.js')
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
    logger.info(`Server up on ${config.ip}:${config.port}!`);
  })
  .on("error", logger.warn);
