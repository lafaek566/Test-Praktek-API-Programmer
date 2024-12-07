const db = require("../config/db");

exports.createTransaction = (req, res) => {
  const { userId } = req.params;
  const { type, amount, description } = req.body;

  if (!type || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid transaction details." });
  }

  const query = `SELECT balance FROM users WHERE id = ?`;

  db.query(query, [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = results[0];
    let newBalance = user.balance;

    if (type === "payment" && newBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    newBalance = type === "top-up" ? newBalance + amount : newBalance - amount;

    const updateQuery = `UPDATE users SET balance = ? WHERE id = ?`;

    db.query(updateQuery, [newBalance, userId], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error processing transaction." });
      }

      const transactionQuery = `INSERT INTO transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)`;
      db.query(
        transactionQuery,
        [userId, type, amount, description],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error logging transaction." });
          }

          res
            .status(200)
            .json({ message: "Transaction completed successfully!" });
        }
      );
    });
  });
};
