import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import User from "./../Models/UserModel.js";
import genearetToken from "../utils/generateToken.js";

const UserRoute = express.Router();
//Login
UserRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genearetToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email Or Password");
    }
  })
);

//Register
UserRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User Already Exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genearetToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User");
    }
  })
);

//Profile User
UserRoute.get(
  "/Profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genearetToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error(" User Not Found");
    }
  })
);

//update Profile
UserRoute.put(
  "/Profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.name || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: genearetToken(updateUser._id),
        createdAt: updateUser.createdAt,
      });
    } else {
      res.status(404);
      throw new Error(" User Not Found");
    }
  })
);

export default UserRoute;
