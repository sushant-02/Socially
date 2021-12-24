const { body } = require("express-validator");

// Auth
const userSignupValidator = [
  body("name").notEmpty().withMessage("Name is required."),

  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password should be of length greater than or equal to 6."),
];

const userSigninValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid."),

  body("password").notEmpty().withMessage("Password is required."),
];

const confirmUserValidator = [
  body("token").notEmpty().withMessage("Token not found."),
];

const resetPasswordFormValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid."),
];

const resetPasswordValidator = [
  body("token").notEmpty().withMessage("Token not found."),

  body("newPassword").notEmpty().withMessage("New password is required"),
];

// USER VALIDATIONS

const updateUserValidator = (req, res, next) => {
  // Check if req.body is empty
  // ref - https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/
  if (
    !req.body ||
    (Object.keys(req.body).length === 0 && req.body.constructor === Object)
  ) {
    return res.status(400).json({
      errors: {
        msg: "Please provide user data to update.",
      },
    });
  }

  // Check if req.body has password
  const { password } = req.body;

  if (password) {
    return res.status(400).json({
      errors: {
        msg: "Please call the password update route to update user password.",
      },
    });
  }

  next();
};

// POST VALIDATIONS

const createPostValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 4, max: 150 })
    .withMessage("Title must be between 4 and 150 characters."),

  body("description")
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({
      min: 10,
      max: 2000,
    })
    .withMessage("Body must be between 10 to 2000 characters."),
];

module.exports = {
  userSignupValidator,
  userSigninValidator,
  confirmUserValidator,
  resetPasswordFormValidator,
  resetPasswordValidator,
  updateUserValidator,
  createPostValidator,
};
