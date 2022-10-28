const { Schema, Types, model } = require("mongoose");

const favoriteSchema = new Schema({
    videoId: String,
    videoTitle: String,
    videoArtist: String,
    video_url: String,
    video_img_url: { type: String, default: "https://i.stack.imgur.com/PtbGQ.png" },
    short_description: { type: String, required: true },
    category: String,
    userFrom: { type: Types.ObjectId, ref: 'User' },
});

const Favorite = model("Favorites", favoriteSchema);

module.exports = {
    Favorite,
};