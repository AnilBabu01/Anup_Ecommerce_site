const User = require("../models/user");
const { validationResult } = require("express-validator");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
const crypto = require("crypto");

// Register a user   api/auth/register
exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: errors.array() });
    }
    const { name, email, password, avatar } = req.body;

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
  }
};

// Update user profile   =>   /api/auth/me/update
exports.updateProfile = async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
};
// Login User  => api/auth/login
exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: errors.array() });
  }
  const { email, password } = req.body;
  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }

  const PasswordMatch = await user.comparePassword(password);
  if (!PasswordMatch) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }

  sendToken(user, 200, res);
};

// Logout user   =>  api/auth/logout

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

// forget password   api/auth/password/forgot

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with this email",
    });
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Recovery email",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetResetPasswordToken = undefined;
    user.resetResetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// forget password   api/auth/password/reset/:token
exports.resetPassword = async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //if user reset password token is not expire then user will be select from db
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Password reset token is invalid or has been expired",
    });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password does not match",
    });
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
};

// get currently user logged in details   api/auth/me
exports.getUserProfile = async (req, res, next) => {
  //req.user.id is possible by authentocate middleware
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

// get currently user logged in details   api/auth/password/update
exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return res.status(400).json({
      success: false,
      message: "Old password is incorrect",
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Both must be same",
    });
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
};

//admin routes

//get all users api/auth/admin/getusers

exports.allUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
};

//get user info by get method api/auth/admin/user/:id

exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
};

// Update user profile by update method  =>   api/auth/admin/user/:id
exports.updateUser = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

// Update user profile by delete method  =>   api/auth/admin/user/:id
exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: true,
      msg: `User does not found with id: ${req.params.id}`,
    });
  }

  await user.remove();

  res.status(200).json({
    success: true,
    msg: "User deleted Successfully",
  });
};
