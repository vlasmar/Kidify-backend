const express = require("express");
const { getVideo, createVideo, getVideos, deleteVideo } = require("../controllers/video");

const videoRouter = express.Router();

videoRouter.get("/:id", getVideo);
videoRouter.get("/", getVideos);
videoRouter.post("/", createVideo);
videoRouter.delete("/:id", deleteVideo);

module.exports = {
    videoRouter,
};