const express = require("express");

const validator = require("../validations");
const postController = require("../controllers/post.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Get all Posts
router.get("/posts", authController.requireSignin, postController.getAllPosts);

// Get a Post
router.get(
  "/post/:postId",
  authController.requireSignin,
  postController.getPost
);

// Create a new post
router.post(
  "/post/new",
  authController.requireSignin,
  validator.createPostValidator,
  postController.createPost
);

// Delete a Post
router.delete(
  "/post/:postId",
  authController.requireSignin,
  postController.hasUserCreatedPost,
  postController.deletePost
);

// Update a Post
router.patch(
  "/post/:postId",
  authController.requireSignin,
  postController.hasUserCreatedPost,
  postController.updatePost
);

// if URL parameter has postId, then attach post to the req object
router.param("postId", postController.postById);

module.exports = router;
