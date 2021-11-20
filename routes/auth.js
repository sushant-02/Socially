const express = require("express");
const router = express.Router();

const validator = require("../validations");
const authController = require("../controllers/auth.controller");

router.post("/signup", validator.userSignupValidator, authController.signup);
router.post("/signin", validator.userSigninValidator, authController.signin);

module.exports = router;
