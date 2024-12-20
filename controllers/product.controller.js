const Product = require("../models/product.model");
const asyncHandle = require("../middlewares/async");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc Get product list   
// @route GET /api/v1/products
// @access Private
exports.productLists = asyncHandle(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        data: products,
    });
});

// @desc Get single product
// @route GET /api/v1/products/:id
// @access Private
exports.productById = asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product) {
        return next(new ErrorResponse('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        data: product,
    });
});

// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandle(async (req, res, next) => {
    const { title, description, price, image } = req.body;
    if(!title || !description || !price ) {
        return next(new ErrorResponse('Please provide all required fields', 400));
    }
    if (!req.file) {
        return next(new ErrorResponse('Image file is required!', 400));
    }
    const imagePath = `/uploads/${req.file.filename}`;

    const product = await Product.create({ title, description, price, image: imagePath });
    res.status(201).json({
        success: true,
        data: product,
    });
});

// @desc Update product
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, price, image } = req.body;
    if(!title || !description || !price ) {
        return next(new ErrorResponse('Please provide all required fields', 400));
    }
    if (!req.file) {
        return next(new ErrorResponse('Image file is required!', 400));
    }
    const imagePath = `/uploads/${req.file.filename}`;

    const product = await Product.findByIdAndUpdate(id, { title, description, price, image: imagePath }, { new: true });
    if(!product) {
        return next(new ErrorResponse('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        data: product,
    });
});

// @desc Delete product
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product) {
        return next(new ErrorResponse('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        data: product,
    });
});