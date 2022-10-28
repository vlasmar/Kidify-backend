const express = require("express");
const { login, signup, logout } = require("../controllers/user");

const authRouter = express.Router();


authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.get("/logout", logout);

module.exports = {
    authRouter,
};