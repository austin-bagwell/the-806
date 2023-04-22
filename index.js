const path = require("path");
const express = require("express");
const drinks = require("./src/menus/drinks.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("index");
});

app.get("/drinks", (req, res) => {
  res.json(drinks);
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
