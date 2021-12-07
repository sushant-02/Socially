const express = require("express");
const router = express.Router();

const validator = require("../validations");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

router.post("/user/signup", validator.userSignupValidator, authController.signup);
router.post("/user/signin", validator.userSigninValidator, authController.signin);
router.patch("/user/confirm", validator.confirmUserValidator, authController.confirmUser);
router.post("/user/reset-password", validator.resetPasswordFormValidator, authController.resetPasswordForm);
router.patch("/user/reset-password", validator.resetPasswordValidator, authController.resetPassword);
router.get('/user', authController.requireSignin, userController.getUser);
router.get('/user/:userId', authController.requireSignin, userController.getUserById);
router.patch('/user/:userId', authController.requireSignin, userController.updateUser);

// if URL parameter has userId, then first userById is executed and it attaches user to the req object
router.param("userId", userController.userById);

module.exports = router;
