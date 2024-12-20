const { Router } = require("express");
const router = Router();
const { 
    Register, 
    Login,
    userLists,
    Logout,
} = require("../controllers/user.controller");
const { protected, adminStatus, Limit } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication operations
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User registration details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: The username of the user
 *             email:
 *               type: string
 *               description: The email address of the user
 *             password:
 *               type: string
 *               description: The password of the user
 *             apiKey:
 *               type: string
 *               description: The API key for the user
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input data
 */
router.post("/register", Register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: Login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: The email of the user
 *             password:
 *               type: string
 *               description: The password of the user
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid login credentials
 */
router.post("/login", Limit, Login);

/**
 * @swagger
 * /api/v1/auth/users:
 *   get:
 *     summary: List all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       403:
 *         description: Forbidden, admin access required
 */
router.get("/users", protected, adminStatus, userLists);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized, invalid token
 */
router.post("/logout", protected, Logout);

module.exports = router;