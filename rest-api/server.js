require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./src/routes/authRoutes");
const balanceRoutes = require("./src/routes/balanceRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");

const app = express();

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "REST API documentation",
    },
  },
  apis: ["./src/routes/*.js"], // Path to your route files for automatic documentation generation
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/balance", balanceRoutes);
app.use("/transaction", transactionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Set port from environment variables, default to 5001
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
