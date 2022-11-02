const express = require("express");
const { getUsers, getProfile, deleteUser, createUser, forgotPassword } = require("../controllers/user");
const { verifyToken } = require("../middlewares/verifyToken")

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/profile", verifyToken, getProfile);
userRouter.delete("/:id", verifyToken, deleteUser);
userRouter.put("forgot-password", forgotPassword);

module.exports = {
    userRouter,
};