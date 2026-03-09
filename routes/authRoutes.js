const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const USER = {
  username: process.env.API_USER,
  password: process.env.API_PASSWORD,
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica o usuário e retorna um token JWT
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== USER.username || password !== USER.password) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;
