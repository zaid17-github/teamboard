require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");

const app = express();
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.get("/", (req, res) => {
  res.send("TeamBoard server is running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working", app: "TeamBoard" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message));
app.listen(5000, () => {
  console.log("Server started on port 5000");
});