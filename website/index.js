const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("*", (req, res) => {
  res.render("404");
});


app.listen(process.env.PORT, process.env.IP, () =>{
  console.log("Server Up!")
})

// Run npm i express ejs to install 
