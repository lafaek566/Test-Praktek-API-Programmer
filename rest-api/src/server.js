import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import balanceRoutes from "./routes/balanceRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { swaggerDocs } from "./swagger.js";

dotenv.config();

const app = express();
app.use(express.json());

// Swagger documentation
swaggerDocs(app);

// Routes
app.use("/auth", authRoutes);
app.use("/balance", balanceRoutes);
app.use("/transaction", transactionRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
