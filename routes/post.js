const express = require("express");
const router = express.Router();

const validator = require("../validations");
const postController = require("../controllers/post.controller");

router.post("/post", validator.createPostValidator, postController.createPost);

module.exports = router;
