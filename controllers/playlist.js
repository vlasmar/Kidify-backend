const { Favorite } = require("../models/favorite");
const { Playlist } = require("../models/playlist");
const { User } = require("../models/user");
const { Video } = require("../models/video");
const { ErrorResponse } = require("../utils/errorResponse");

const getPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    res.json(playlist);
  } catch (error) {
    next(new ErrorResponse(error.message));
  }
};

const getPlaylists = async (req, res, next) => {
    try {
      const user = await User.findOne({_id: req.user.id}).populate("playlists");
      if (user.playlists.length !== 0){
        res.json(user.playlists);
      } else {
        res.send({"message": "No playlist"})
      }
    } catch (error) {
      next(new ErrorResponse(error.message));
    }
  };

const createPlaylist = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).populate("playlists");
    const playlist = await Playlist({ ...req.body, user: req.user.id }).save();
    user.playlists.push(playlist._id);
    await user.save();
    res.status(201).send({ data: playlist });
  } catch (error) {
    next(new ErrorResponse(error.message));
  }
};

const editPlaylist = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const playlist = await Playlist.findByIdAndUpdate(id, body);
    const user = await User.findById(req.user._id);
    if (!user._id.equals(playlist.user))
      return res
        .status(403)
        .send({ message: "User don't have access to edit" });
    playlist.name = req.body.name;
    playlist.desc = req.body.desc;
    await playlist.save();
    res.status(200).send({ message: "Updated successfully" });
  } catch (error) {
    next(new ErrorResponse(error.message));
  }
};

const addToPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.body.playlistId);
    const user = await User.findById(req.user._id);
    if (!user._id.equals(playlist.user))
      return res.status(403).send({ message: "User don't have access to add" });
    if (playlist.videos.indexOf(req.body.videoId) === -1) {
      playlist.videos.push(req.body.videoId);
    }
    await playlist.save();
    res.status(200).send({ data: playlist, message: "Added to playlist" });
  } catch (error) {
    next(new ErrorResponse(error.message));
  }
};

const removeFromPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.body.playlistId);
    const user = await User.findById(req.user._id);
    if (!user._id.equals(playlist.user))
      return res
        .status(403)
        .send({ message: "User don't have access to remove" });
    const index = playlist.videos.indexOf(req.body.videoId);
    playlist.videos.splice(index, 1);
    await playlist.save();
    res.status(200).send({ data: playlist, message: "Removed from playlist" });
  } catch (error) {
    next(new ErrorResponse(error.message));
  }
};

const deletePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    const user = await User.findById(req.user._id);
    if (!user._id.equals(playlist.user))
      return res
        .status(403)
        .send({ message: "User don't have access to delete" });
    const index = user.playlists.indexOf(req.params.id);
    user.playlists.splice(index, 1);
    await user.save();
    await playlist.remove();
    res.status(200).send({ data: playlist, message: "Removed from library" });
  } catch (error) {
    next(new ErrorResponse(error.message));
  }
};

module.exports = {
  getPlaylist,
  getPlaylists,
  createPlaylist,
  editPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist,
};
