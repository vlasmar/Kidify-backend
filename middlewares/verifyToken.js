const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../utils/errorResponse");

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.access_token;
        if (!token) throw new ErrorResponse("Forbidden", 403);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        error.statusCode = 403;
        next(error);
    }

    //console.log(req.cookies);
};

module.exports = {
    verifyToken,
};
