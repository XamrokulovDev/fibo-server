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

// GET productLists
router.get("/", productLists);
// GET productById
router.get("/:id", protected ,productById);
// POST createProduct
router.post("/create", protected, adminStatus, upload.single("image"), createProduct);
// PUT updateProduct
router.put("/update/:id", protected, adminStatus, upload.single("image"), updateProduct);
// DELETE deleteProduct
router.delete("/delete/:id", protected, adminStatus, deleteProduct);

module.exports = router;