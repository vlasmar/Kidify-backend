const { Schema, Types, model } = require("mongoose");

const playlistSchema = new Schema({
    name: {type: String, required:true},
    user: {type: Types.ObjectId, ref: 'User', required:true},
    desc: {type: String},
    videos: {type: Array, default: []},
});

const Playlist = model("Playlists", playlistSchema);

module.exports = {
    Playlist,
};