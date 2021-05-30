const express = require("express");
const app = express();
app.set("views", "./views")
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("*", (req, res) => {
  res.render("404");
});


app.listen(client.config.website.port, client.config.website.ip, () =>{
  console.log("Server Up!")
})

// Run npm i express ejs to install 
