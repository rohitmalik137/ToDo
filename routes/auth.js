const express = require("express");
// const { body } = require('express-validator');

const User = require("../models/user");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// PUT /auth/signup
router.put("/signup", authController.signup);

// POST /auth/login
router.post("/login", authController.login);

// GET /auth/user
router.get("/user", isAuth, authController.userData);

module.exports = router;
