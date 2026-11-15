const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("TeamBoard server is running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working", app: "TeamBoard" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});