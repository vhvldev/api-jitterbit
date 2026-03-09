const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Order API",
      version: "1.0.0",
      description: "API para gerenciamento de pedidos",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      },
      {
        url: "https://api-jitterbit.onrender.com",
        description: "Servidor produção"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
