const express = require("express");
const fs = require("fs");
const app = express();
app.set("view engine", "ejs");

// setup basic routing
app.use((req, res, next) => {
  // we'll be doing something here
  // the next argument is basically a function which triggers whatever happens next
  next();
});
// basic error handling
app.use((err, req, res, next) => {});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("*", (req, res) => {
  res.render("404");
});
