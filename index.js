const path = require("path");
const express = require("express");
const menu = require("./src/menus/menu.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("index");
});

app.get("/api/menu/", (req, res) => {
  res.json(menu);
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
