const { body } = require("express-validator");

const createPostValidator = [
  body("title", "Title is required").notEmpty(),
  body("title", "Title must be between 4 and 150 characters.").isLength({
    min: 4,
    max: 150,
  }),
  body("body", "Content is required.").notEmpty(),
  body("body", "Body must be between 10 to 2000 characters.").isLength({
    min: 10,
    max: 2000,
  }),
];

module.exports = { createPostValidator };
