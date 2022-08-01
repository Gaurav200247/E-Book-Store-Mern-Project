const User = require("../Models/UserModel");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../Errors/Custom-error");
const SendToken = require("../Utils/SendToken");
const SendMail = require("../Utils/SendMail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

// ---------------------- register user ----------------------
const register = async (req, res) => {
  const mycloud = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "Book Store App Users Avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: mycloud.public_id, url: mycloud.secure_url },
  });

  SendToken(res, StatusCodes.OK, user);
};

// ---------------------- login user ----------------------
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomAPIError(
      "Please provide Email and Password",
      StatusCodes.BAD_REQUEST
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomAPIError(`Invalid Credentials`, StatusCodes.UNAUTHORIZED);
  }

  const isMatched = await user.comparePassword(password);
  //   console.log(isMatched);

  if (!isMatched) {
    throw new CustomAPIError(`Invalid Credentials`, StatusCodes.UNAUTHORIZED);
  }

  SendToken(res, StatusCodes.OK, user);
};

// ---------------------- logout user ----------------------
const logout = async (req, res) => {
  res.cookie("userToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Logged Out SuccessFully !!" });
};

// ---------------------- Forgot Password Sending Email to User ----------------------
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomAPIError(`Invalid Credentials`, StatusCodes.UNAUTHORIZED);
  }

  const resetToken = await user.getResetToken();
  //   console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.LOCAL_HOST}/password/reset/${resetToken}`;

  const message = `Your Password Reset URL is :\n\n${resetPasswordUrl}\n\nIf you have not requested this mail, Please ignore it.`;

  try {
    await SendMail({
      email: user.email,
      subject: "Books Store Password Recovery",
      message,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: `Email Sent to ${user.email} SuccessFully !!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw new CustomAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// ---------------------- Reset Password from Link ----------------------
const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomAPIError(
      "Reset Password Token is Invalid or Expired...",
      StatusCodes.BAD_REQUEST
    );
  }

  if (req.body.resetPassword !== req.body.confirmPassword) {
    throw new CustomAPIError(
      "Passwords Does not Match",
      StatusCodes.BAD_REQUEST
    );
  }

  user.password = req.body.resetPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  SendToken(res, StatusCodes.OK, user);
};

// ************************************************************************************
const getUserDetails = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(StatusCodes.OK).json(user);
};

const updateUserPassword = async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatched = await user.comparePassword(req.body.OldPassword);

  if (!isMatched) {
    throw new CustomAPIError(`Invalid Credentials`, StatusCodes.UNAUTHORIZED);
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    throw new CustomAPIError(
      "Passwords Does not Match",
      StatusCodes.BAD_REQUEST
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  SendToken(res, StatusCodes.OK, user);
};

const updateUserDetails = async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageID = user.avatar.public_id;

    // console.log(imageID);

    await cloudinary.uploader.destroy(imageID);

    const mycloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "Book Store App Users Avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }

  await User.findByIdAndUpdate(req.user.id, newUserData, {
    runValidators: true,
    new: true,
    useFindAndModify: false,
  });

  res.status(StatusCodes.CREATED).json({ success: true });
};

// ************************************************************************************
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json(users);
};

const getSingleUser = async (req, res) => {
  // console.log(req.params.id);
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new CustomAPIError(
      `User does not exist with this id ${req.params.id} !!`,
      StatusCodes.NOT_FOUND
    );
  }

  res.status(StatusCodes.OK).json(user);
};

const updateUsersRole = async (req, res) => {
  const { name, email, role } = req.body;

  const newUserData = {
    name,
    email,
    role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    throw new CustomAPIError(
      `User does not exist with this id ${req.params.id} !!`,
      StatusCodes.NOT_FOUND
    );
  }

  res.status(StatusCodes.OK).json({ success: true });
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) {
    throw new CustomAPIError(
      `User does not exist with this id ${req.params.id} !!`,
      StatusCodes.NOT_FOUND
    );
  }

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserDetails,
  getAllUsers,
  getSingleUser,
  updateUsersRole,
  deleteUser,
};
