const User = require("../models/User");

const { validationResult } = require("express-validator");

module.exports.userById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId)
      .populate("following", "_id name")
      .populate("followers", "_id name");

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
    if (err.name === "CastError") {
      return res.status(400).json({
        errors: {
          msg: "We're sorry! Something went wrong",
          serverMsg: "Please check the userId parameter",
        },
      });
    }

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
  const authorized = req.profile && req.auth && sameIds;

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
    const user = await User.findById(userId)
      .populate("following", "_id name")
      .populate("followers", "_id name");
    if (!user) {
      return res.status(400).json({
        errors: {
          msg: "Sorry, we could not find a user this token",
        },
      });
    }

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

    const { password, ...responseUser } = updatedUser._doc;

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

module.exports.deleteUser = async (req, res) => {
  const { id: userId } = req.auth;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(400).json({
        errors: {
          msg: "User not found or is already deleted.",
        },
      });
    }

    return res.status(200).json({ msg: "User successfully deleted." });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.addFollower = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Only send the first error message
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { id: userId } = req.auth;
  const { followId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      followId,
      { $push: { followers: userId } },
      { returnDocument: "after" }
    );

    if (!user) {
      return res
        .status(400)
        .json({ errors: { msg: "User with given follow ID was not found." } });
    }

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

module.exports.addFollowing = async (req, res) => {
  const { id: userId } = req.auth;
  const { followId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { following: followId } },
      { returnDocument: "after" }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name");

    user.password = undefined;

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.removeFollower = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Only send the first error message
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { id: userId } = req.auth;
  const { unfollowId } = req.body;

  try {
    await User.findByIdAndUpdate(
      unfollowId,
      { $pull: { followers: userId } },
      { returnDocument: "after" }
    );

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

module.exports.removeFollowing = async (req, res) => {
  const { id: userId } = req.auth;
  const { unfollowId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: unfollowId } },
      { returnDocument: "after" }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name");

    user.password = undefined; // This will not send password to the response

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};
