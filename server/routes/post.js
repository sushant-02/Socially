const express = require("express");

const validator = require("../validations");
const postController = require("../controllers/post.controller");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post(
  "/post/new/:userId",
  authController.requireSignin,
  validator.createPostValidator,
  postController.createPost
);

router.param("userId", userController.userById);

module.exports = router;
