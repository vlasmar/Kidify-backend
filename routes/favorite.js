const express = require("express");
const { getFavorites, addToFavorites, removeFromFavorites, getFavorited } = require("../controllers/favorite");
const { verifyToken } = require("../middlewares/verifyToken");

const favoritesRouter = express.Router();

favoritesRouter.get("/", verifyToken, getFavorites);
favoritesRouter.put("/addToFavorites", verifyToken, addToFavorites);
favoritesRouter.put("/removeFromFavorites", verifyToken, removeFromFavorites);
favoritesRouter.post("/favorited", verifyToken, getFavorited)

module.exports = {
    favoritesRouter,
};