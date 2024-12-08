import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/**
 * Swagger setup
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     Transaction:
 *       type: object
 *       required:
 *         - user_id
 *         - service
 *         - amount
 *       properties:
 *         user_id:
 *           type: integer
 *         service:
 *           type: string
 *         amount:
 *           type: integer
 */

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API",
      version: "1.0.0",
      description:
        "A simple REST API for user registration, login, balance management, and transactions",
    },
    servers: [
      {
        url: "http://localhost:5001", // Your server URL
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to your API route files
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
