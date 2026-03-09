const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado (Atlas)"))
  .catch((err) => console.log(err));

app.use("/", authRoutes);
app.use("/", orderRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
