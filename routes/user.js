const express = require("express");
const { getUsers, getProfile, deleteUser, createUser } = require("../controllers/user");
const { verifyToken } = require("../middlewares/verifyToken")

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/profile", verifyToken, getProfile);
userRouter.delete("/:id", verifyToken, deleteUser);

module.exports = {
    userRouter,
};