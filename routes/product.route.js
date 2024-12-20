const { Router } = require("express");
const router = Router();

const { 
    productLists,
    productById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");
const { protected, adminStatus } = require("../middlewares/auth");
const upload = require("../utils/fileUpload");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management operations
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Server error
 */
router.get("/", productLists);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/:id", protected, productById);

/**
 * @swagger
 * /api/v1/products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the product
 *               description:
 *                 type: string
 *                 description: The product description
 *               price:
 *                 type: string
 *                 description: The price of the product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the product
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Unauthorized, only admin can create product
 *       500:
 *         description: Server error
 */
router.post("/create", protected, adminStatus, upload.single("image"), createProduct);

/**
 * @swagger
 * /api/v1/products/update/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product's ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid data provided
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put("/update/:id", protected, adminStatus, upload.single("image"), updateProduct);

/**
 * @swagger
 * /api/v1/products/delete/{id}:
 *   delete:
 *     summary: Delete a product by its ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product's ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:id", protected, adminStatus, deleteProduct);

module.exports = router;