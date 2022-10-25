const express = require("express");
const { getUsers, getUser, deleteUser } = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:username", getUser);
userRouter.delete("/:id", deleteUser);

module.exports = {
    userRouter,
};