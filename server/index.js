const express = require("express");
const app = express();
const config = require("./config/key");

// Configuration for parsers
const bodyParser = require("body-Parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongdoDB connected"))
  .catch((e) => console.log(e));

// Set router
app.use("/api/users", require("./routes/users"));

// Make virtual path for upload
app.use("/uploads", express.static("uploads"));

// Production settings
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

// Set port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Template app listening on port ${port}`);
});
