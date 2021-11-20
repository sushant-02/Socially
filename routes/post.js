const express = require("express");

const validator = require("../validations");
const postController = require("../controllers/post.controller");

const router = express.Router();

router.post("/post", validator.createPostValidator, postController.createPost);

module.exports = router;
