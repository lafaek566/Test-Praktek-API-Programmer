import db from "../config/db.js";

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Get user balance
 *     description: This endpoint allows the user to view their balance.
 *     operationId: getBalance
 *     tags:
 *       - Balance
 *     responses:
 *       200:
 *         description: Balance retrieved successfully
 *       401:
 *         description: Unauthorized
 */
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

/**
 * @swagger
 * /transaction/pay:
 *   post:
 *     summary: Pay for a service
 *     description: This endpoint allows the user to pay for a service.
 *     operationId: payForService
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *               amount:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Payment successful
 *       400:
 *         description: Insufficient balance
 */
export const pay = async (req, res) => {
  const userId = req.user.id;
  const { service, amount } = req.body;

  try {
    const [rows] = await db.query("SELECT balance FROM users WHERE id = ?", [
      userId,
    ]);
    const balance = rows[0].balance;

    if (balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    await db.query("UPDATE users SET balance = balance - ? WHERE id = ?", [
      amount,
      userId,
    ]);
    await db.query(
      "INSERT INTO transactions (user_id, service, amount) VALUES (?, ?, ?)",
      [userId, service, amount]
    );
    res.json({ message: `Payment for ${service} successful` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
