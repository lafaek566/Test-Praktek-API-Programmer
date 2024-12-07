const db = require("../config/db");

exports.checkBalance = (req, res) => {
  const { userId } = req.params;
  const query = `SELECT balance FROM users WHERE id = ?`;

  db.query(query, [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ balance: results[0].balance });
  });
};

exports.topUp = (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid top-up amount." });
  }

  const query = `UPDATE users SET balance = balance + ? WHERE id = ?`;

  db.query(query, [amount, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating balance." });
    }
    res.status(200).json({ message: "Balance topped up successfully!" });
  });
};
