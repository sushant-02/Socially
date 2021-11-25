const express = require("express");
const router = express.Router();

const validator = require("../validations");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

router.post("/user/signup", validator.userSignupValidator, authController.signup);
router.post("/user/signin", validator.userSigninValidator, authController.signin);
router.patch("/user/confirm", validator.confirmUserValidator, authController.confirmUser);
router.get('/user', authController.requireSignin, authController.getUser);

router.param("userId", userController.userById);

module.exports = router;
