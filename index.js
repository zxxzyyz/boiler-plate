const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-Parser");
const { User } = require("./models/User");
const config = require("./config/key");

// Configuration for bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongdoDB connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Hello nodemon!");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
