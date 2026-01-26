const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("./users");

const app = express();
app.use(express.json());

const SECRET_KEY = "liem_secret_key";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Sai thông tin đăng nhập" });
  }

  // Tạo JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.listen(3000, () => {
  console.log("Auth server running on port 3000");
});
