const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../models/user");
const { ErrorResponse } = require("../utils/errorResponse");

const login = async (req, res, next) => {
    try {
        const {
            body: { username, password },
        } = req;

        const user = await User.findOne({username}).select("+password");
        if (!user) throw new ErrorResponse("Username or password are incorrect", 401);
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new ErrorResponse("Username or password are incorrect", 401);
        const payload = {username: user.username, id: user._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "580m", });
        
      res.cookie("access_token", token, {
            maxAge: 1000 * 60 * 60 * 8,
            httpOnly: true,
        }).json(payload);
    } catch (error) {
        next(error);
    }
}

const signup = async (req, res, next) => {
    try {
    const {
        body: { first_name, last_name, email, username, password, user_img_url, date_of_birth, role },
    } = req;

    const user = await User.findOne({username}).populate("role");
    if (user) throw new ErrorResponse("username already exists", 400);
    const hash = await bcrypt.hash(password, 5);
    const newUser = await User.create({ first_name, last_name, email, username, password : hash, user_img_url, date_of_birth, role });
    const payload = {email: (await newUser).email, username: newUser.username, id: newUser._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "580m", });
    res.json(token);
} catch (error) {
    next(new ErrorResponse(error.message));
}
}

const logout = async (req, res, next) => {
    res.clearCookie('access_token');
    return res.sendStatus(200);
}

const createUser = async (req, res, next) => {
    try{
        const { body } = req;
        const user = await User.create(body);
        res.json(user);
    } catch (error) {
        next(new ErrorResponse(error.message));
    }
}

const getProfile = async (req, res, next) => {
    try{
        const user = await User.findOne({_id: req.user.id}).populate("role");
        res.json(user);
    } catch (error) {
        next(new ErrorResponse(error.message));
    }
};

const getUsers = async (req, res, next) => {
    try{
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(new ErrorResponse(error.message));
    }
};

const updateUser = async (req, res, next) => {
    try{
        const { params: { id }, body, } = req;
        const user = await User.findByIdAndUpdate(id, body);
        res.json(user);
    } catch (error) {
        next(new ErrorResponse(error.message));
    }
};


const deleteUser = async (req, res, next) => {
    try{
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.json(user);
    } catch (error) {
        next(new ErrorResponse(error.message));
    }
};

module.exports = {
    createUser,
    getProfile,
    getUsers,
    updateUser,
    deleteUser,
    login,
    signup,
    logout,
};
