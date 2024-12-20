const { Router } = require("express");
const router = Router();

const { 
    Register, 
    Login,
    userLists,
    Logout,
} = require("../controllers/user.controller");
const { protected, adminStatus, Limit } = require("../middlewares/auth");

// POST Register
router.post("/register", Register);
// POST Login 
router.post("/login", Limit ,Login);
// GET userLists
router.get("/users", protected ,adminStatus ,userLists);
// POST Logout
router.post("/logout", protected ,Logout);

module.exports = router;