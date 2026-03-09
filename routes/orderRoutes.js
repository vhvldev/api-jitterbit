const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         idItem:
 *           type: integer
 *           example: 1
 *         quantidadeItem:
 *           type: integer
 *           example: 2
 *         valorItem:
 *           type: number
 *           format: double
 *           example: 50.25
 *     OrderRequest:
 *       type: object
 *       properties:
 *         numeroPedido:
 *           type: string
 *           example: "12345-01"
 *         valorTotal:
 *           type: number
 *           format: double
 *           example: 150.75
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           example: "2026-03-09T10:00:00.000Z"
 *         items:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/OrderItem"
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cria um novo pedido
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/OrderRequest"
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       500:
 *         description: Erro ao criar pedido
 */
router.post("/order", auth, async (req, res) => {
  try {
    const body = req.body;

    const order = new Order({
      orderId: body.numeroPedido,
      value: Math.round(body.valorTotal * 100),
      creationDate: new Date(body.dataCriacao),
      items: body.items.map((i) => ({
        productId: Number(i.idItem),
        quantity: i.quantidadeItem,
        price: Math.round(i.valorItem * 100),
      })),
    });

    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get("/order/list", auth, async (req, res) => {
  const orders = await Order.find();

  res.json(orders);
});

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Busca um pedido pelo identificador
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get("/order/:orderId", auth, async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId });

  if (!order) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }

  res.json(order);
});

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Atualiza um pedido existente
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/OrderRequest"
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *       500:
 *         description: Erro ao atualizar pedido
 */
router.put("/order/:orderId", auth, async (req, res) => {
  try {
    const body = req.body;

    const updateDoc = {};

    if (body.numeroPedido !== undefined) {
      updateDoc.orderId = body.numeroPedido;
    }
    if (body.dataCriacao !== undefined) {
      updateDoc.creationDate = new Date(body.dataCriacao);
    }
    if (body.valorTotal !== undefined) {
      updateDoc.value = Math.round(body.valorTotal * 100);
    }
    if (Array.isArray(body.items)) {
      updateDoc.items = body.items.map((i) => ({
        productId: Number(i.idItem),
        quantity: i.quantidadeItem,
        price: Math.round(i.valorItem * 100),
      }));
    }

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      updateDoc,
      { returnDocument: "after" }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Remove um pedido
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido deletado
 */
router.delete("/order/:orderId", auth, async (req, res) => {
  await Order.deleteOne({ orderId: req.params.orderId });

  res.json({ message: "Pedido deletado" });
});

module.exports = router;
