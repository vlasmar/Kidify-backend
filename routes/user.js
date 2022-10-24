const express = require("express");
const { getUsers, deleteUser } = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.delete("/:id", deleteUser);

module.exports = {
    userRouter,
};