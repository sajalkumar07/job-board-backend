const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");

// Signup route
router.post("/signup", userController.signup);
// Login route
router.post("/login", userController.login);
//send mail route

module.exports = router;
