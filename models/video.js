const { Schema, model } = require("mongoose");

const videoSchema = new Schema({
    title: String,
    artist: String,
    video_url: String,
    video_img_url: { type: String, default: "https://i.stack.imgur.com/PtbGQ.png" },
    short_description: { type: String, required: true },
    category: String,
});

const Video = model("Video", videoSchema);

module.exports = {
    Video,
};
