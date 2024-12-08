import express from "express";
import authenticate from "../middleware/authenticate.js"; // Ensure this path is correct
import { getBalance } from "../controllers/transactionController.js";

const router = express.Router();

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Get user balance
 */
router.get("/balance", authenticate, getBalance);

export default router;
