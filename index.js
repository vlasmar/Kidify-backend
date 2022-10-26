require("dotenv/config");
require("./db");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const express = require("express");
const { videoRouter } = require("./routes/video");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 4000;

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use("/videos", videoRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
