const mongoose = require("mongoose");
const validator = require("validator");
const JWT = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      maxlength: [30, "name must be less than 30 characters"],
      minlength: [5, "name must be more than 5 characters"],
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      minlength: [8, "name must be more than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    role: {
      type: String,
      default: "user",
    },
    Rented_Books: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
        required: true,
      },
    ],
    Bought_Books: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
        required: true,
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// ---------------- Password Hashing ----------------
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcryptjs.hash(this.password, 10);
});

// ---------------- Generate JWT token ----------------
UserSchema.methods.getJWTtoken = function () {
  return JWT.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// ---------------- Comparing Passwords ----------------
UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcryptjs.compare(enteredPassword, this.password);
  return isMatch;
};

// ---------------- Get Password Reset Token ----------------
UserSchema.methods.getResetToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  // console.log(this.resetPasswordExpire, this.resetPasswordToken);

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
