const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const protect = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.get("/", (req, res) => {
  res.send("TeamBoard server is running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working", app: "TeamBoard" });
});

app.get("/api/me", protect, (req, res) => {
  res.json({ message: "You are logged in", userId: req.userId });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message));
app.listen(5000, () => {
  console.log("Server started on port 5000");
});