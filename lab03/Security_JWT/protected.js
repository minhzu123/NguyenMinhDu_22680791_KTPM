const express = require("express");
const authenticateToken = require("./authMiddleware");

const app = express();

app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Truy cập thành công 🎉",
    user: req.user
  });
});

app.listen(4000, () => {
  console.log("Protected server running on port 4000");
});
