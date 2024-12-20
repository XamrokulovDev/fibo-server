const { Router } = require("express");
const router = Router();

const { addToCart, getCart, deleteFromCart } = require("../controllers/cart.controller");
const { protected } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the shopping cart
 */

/**
 * @swagger
 * /api/v1/cart/add/{productId}:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to add to the cart
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       401:
 *         description: Unauthorized, user must be logged in
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post("/add/:productId", protected, addToCart);

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get all products in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products in the cart
 *       401:
 *         description: Unauthorized, user must be logged in
 *       500:
 *         description: Server error
 */
router.get("/", protected, getCart);

/**
 * @swagger
 * /api/v1/cart/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to remove from the cart
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *       401:
 *         description: Unauthorized, user must be logged in
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Server error
 */
router.delete("/remove/:productId", protected, deleteFromCart);

module.exports = router;