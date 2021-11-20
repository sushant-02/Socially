const { body } = require("express-validator");

// Auth
const userSignupValidator = [
  body("name").notEmpty().withMessage("Name is required."),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password should be of length greater than or equal to 6"),
];

const userSigninValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid."),
  body("password").notEmpty().withMessage("Password is required"),
];

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

module.exports = {
  createPostValidator,
  userSignupValidator,
  userSigninValidator,
};
