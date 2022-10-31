const { Favorite } = require("../models/favorite");
const { User } = require("../models/user");
const { Video } = require("../models/video");
const { ErrorResponse } = require("../utils/errorResponse");

const getFavorites = async (req, res, next) => {
  try{
    const user = await User.findOne({_id: req.user.id}).populate("favorites");
    if (user.favorites.length !== 0){
      res.json(user.favorites);
    } else {
      res.send({"message": "Favorites list is empty"})
    }
} catch (error) {
    next(new ErrorResponse(error.message));
}
};

const getFavorited = async (req, res, next) => {
    try {
      const favorite = await Favorite.find({"videoId": req.body.videoId, "userFrom": req.body.userFrom});
      let result = false;
      if(favorite.length !== 0){
        result = true
      }
      res.json({
        success: true,
        favorited: result,
      });
    } catch (error) {
      next(new ErrorResponse(error.message));
    }
  };

const addToFavorites = async (req, res, next) => {
    try {
      const { videoId } = req.body;
      const user = await User.findOne({_id: req.user.id});
      if (user.favorites.includes(videoId))
        return res.status(409).send("Video already a favorite.");
      user.favorites.push(videoId);
      User.findOneAndUpdate({ _id: req.user.id }, user, { new: true })
      .then((user) => res.json(user.favorites))
    } catch (error) {
      next(new ErrorResponse(error.message));
    }
  };

  const removeFromFavorites = async (req, res, next) => {
    try {
      const { videoId } = req.body;
      const user = await User.findOne({_id: req.user.id});
      if (!user.favorites.includes(videoId))
        return res.status(409).send("Video isn't a favorite.");
      user.favorites.splice(user.favorites.indexOf(videoId), 1);
      User.findOneAndUpdate({ _id: req.user.id }, user, { new: true })
      .then((user) => res.json(user.favorites))
    } catch (error) {
      next(new ErrorResponse(error.message));
    }
  };

  module.exports = {
    getFavorites,
    getFavorited,
    addToFavorites,
    removeFromFavorites,
  };