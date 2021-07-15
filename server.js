const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const app = express();
const db = config.get("mongoURI");
const path = require("path");
const cors = require("cors");
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connected DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

app.use(cors({ origin: true }));

app.use(express.json());

app.use("/api/users", require("./routers/users"));
app.use("/api/auth", require("./routers/auth"));
app.use("/api/profile", require("./routers/profile"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
