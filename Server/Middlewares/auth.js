const { StatusCodes } = require("http-status-codes");
const JWT = require("jsonwebtoken");
const CustomAPIError = require("../Errors/Custom-error");
const User = require("../Models/UserModel");

const authMiddleware = async (req, res, next) => {
  const { userToken } = req.cookies;

  if (!userToken) {
    throw new CustomAPIError(
      "Please Login to Access this Route...",
      StatusCodes.BAD_REQUEST
    );
  }

  const decoded = JWT.verify(userToken, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  // console.log(req.user);

  next();
};

const authRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomAPIError(
          "This User is Not Allowed to Access this Route",
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    next();
  };
};

module.exports = { authMiddleware, authRoles };
