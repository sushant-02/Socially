const express = require("express");

const validator = require("../validations");
const postController = require("../controllers/post.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Get all Posts
router.get(
  "/posts",
  authController.requireSignin,
  postController.getAllPosts
)

// Create a new post
router.post(
  "/post/new",
  authController.requireSignin,
  validator.createPostValidator,
  postController.createPost
);

module.exports = router;
