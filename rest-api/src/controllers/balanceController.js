import db from "../config/db.js";

export const getBalance = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.query("SELECT balance FROM users WHERE id = ?", [
      userId,
    ]);
    res.json({ balance: rows[0].balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const topUp = async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;

  try {
    await db.query("UPDATE users SET balance = balance + ? WHERE id = ?", [
      amount,
      userId,
    ]);
    res.json({ message: "Balance topped up successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
