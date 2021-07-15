const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const express = require("express");
const app = express();
const port = 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
