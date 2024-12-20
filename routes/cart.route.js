const { Router } = require("express");
const router = Router();

const { addToCart, getCart, deleteFromCart } = require("../controllers/cart.controller");
const { protected } = require("../middlewares/auth");

router.post("/add/:productId", protected, addToCart);
router.get("/", protected, getCart);
router.delete("/remove/:productId", protected, deleteFromCart);

module.exports = router;
