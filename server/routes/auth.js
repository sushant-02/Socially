const express = require("express");
const router = express.Router();

const validator = require("../validations");
const authController = require("../controllers/auth.controller");

router.post("/user/signup", validator.userSignupValidator, authController.signup);
router.post("/user/signin", validator.userSigninValidator, authController.signin);
router.patch("/user/confirm", validator.confirmUserValidator, authController.confirmUser);
router.post("/user/reset-password", validator.resetPasswordFormValidator, authController.resetPasswordForm);
router.patch("/user/reset-password", validator.resetPasswordValidator, authController.resetPassword);

module.exports = router;
