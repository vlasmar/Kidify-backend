const express = require("express");
const { getPlaylist, getPlaylists, createPlaylist, editPlaylist, addToPlaylist, removeFromPlaylist, deletePlaylist } = require("../controllers/playlist");
const { verifyToken } = require("../middlewares/verifyToken");

const playlistRouter = express.Router();

playlistRouter.get("/:playlist_id", verifyToken, getPlaylist);
playlistRouter.get("/", verifyToken, getPlaylists);
playlistRouter.post("/create-playlist", verifyToken, createPlaylist);
playlistRouter.put("/edit/:id", verifyToken, editPlaylist);
playlistRouter.put("/add-video", verifyToken, addToPlaylist);
playlistRouter.post("/remove-video", verifyToken, removeFromPlaylist);
playlistRouter.delete("/:id", verifyToken, deletePlaylist);

module.exports = {
    playlistRouter,
};