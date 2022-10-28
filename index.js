const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://zxxzyyz:rnwjd1@boilerplate.sx2ezz6.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongdoDB connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
