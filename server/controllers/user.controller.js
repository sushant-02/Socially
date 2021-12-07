const User = require("../models/User");

module.exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        errors: {
          msg: "User not found!",
        },
      });
    }

    req.profile = user;
    next();
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.hasAuthorization = (req, res, next) => {
  const sameIds = String(req.profile._id) === String(req.auth.id);
  const authorized =
    req.profile && req.auth && sameIds;

  if (!authorized) {
    return res.status(403).json({
      errors: {
        msg: "User is not authorized to perform this action.",
      },
    });
  }

  next();
};

// To get All users - is not used in the project yet
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.getUser = async (req, res) => {
  const { id: userId } = req.auth;

  try {
    const user = await User.findById(userId);
    const { password, ...responseUser } = user._doc;

    return res.status(200).json({ user: responseUser });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.getUserById = (req, res) => {
  const { password, ...responseUser } = req.profile._doc;
  return res.status(200).json({ user: responseUser });
};

module.exports.updateUser = async (req, res) => {
  const { id: userId } = req.auth;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { returnDocument: "after" }
    );
    
    const {password, ...responseUser} = updatedUser._doc;

    return res.status(200).json({user: responseUser});

  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};


module.exports.deleteUser = async (req, res) => {
  const { id: userId } = req.auth;

  try {
    await User.findByIdAndDelete(userId);
    return res.status(200).json({msg: 'User successfully deleted.'})
  } catch(err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
}