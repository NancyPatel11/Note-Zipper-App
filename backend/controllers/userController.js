const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPass,
    pic,
  });

  //check if user is successfully created
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist! Please register.");
  }

  if (await bcrypt.compare(password, user.password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password!");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const existingUser = await User.findById(req.user._id);

  if (existingUser) {
    existingUser.name = req.body.name || existingUser.name;

    const { email } = req.body;
    if (existingUser.email !== email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400);
        throw new Error("User Email Already Exists");
      }
      existingUser.email = email;
    }

    existingUser.pic = req.body.pic || existingUser.pic;

    console.log(existingUser.email);
    console.log(existingUser.pic);

    if (req.body.password) {
      existingUser.password = req.body.password;
    }

    const userData = {
      name: existingUser.name,
      email: existingUser.email,
      pic: existingUser.pic,
    };

    const updatedUser = await User.findByIdAndUpdate(req.user._id, userData, {
      new: true,
    });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, loginUser, updateUserProfile };
