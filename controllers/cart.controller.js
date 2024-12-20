const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const asyncHandle = require("../middlewares/async");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc Add product to cart
// @route POST /api/v1/cart/add/:productId
// @access Private
exports.addToCart = asyncHandle(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorResponse("Product not found", 404));
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({
            user: userId,
            products: [{ product: productId, quantity: 1 }]
        });
    } else {
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex >= 0) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
    }

    await cart.save();

    res.status(200).json({
        success: true,
        data: cart,
    });
});

// @desc Get user's cart
// @route GET /api/v1/cart
// @access Private
exports.getCart = asyncHandle(async (req, res, next) => {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    
    if (!cart) {
        return next(new ErrorResponse("Cart not found", 404));
    }

    res.status(200).json({
        success: true,
        data: cart,
    });
});

// @desc Remove product from cart
// @route DELETE /api/v1/cart/remove/:productId
// @access Private
exports.deleteFromCart = asyncHandle(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
        return next(new ErrorResponse("Cart not found", 404));
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex === -1) {
        return next(new ErrorResponse("Product not found in your cart", 404));
    }

    cart.products.splice(productIndex, 1);

    await cart.save();

    res.status(200).json({
        success: true,
        message: "Product removed from cart",
        data: cart,
    });
});
