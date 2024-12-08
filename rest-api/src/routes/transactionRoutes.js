import express from "express";
import { pay } from "../controllers/transactionController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

/**
 * @swagger
 * /transaction/pay:
 *   post:
 *     summary: Pay for a service
 */
router.post("/pay", authenticate, pay);

export default router;
