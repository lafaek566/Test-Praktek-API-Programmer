const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error registering user." });
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ?`;

  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: "User not found." });
    }

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  });
};
