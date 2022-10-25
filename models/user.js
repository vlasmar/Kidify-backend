const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, min: 6 },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6, max: 32, select: false },
    user_img_url: { type: String, default: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png" },
    role: { type: Types.ObjectId, ref: 'Role' },
    favorites: [{
        type: Types.ObjectId,
        ref: 'Video' 
    }],
});

const User = model("User", userSchema);

module.exports = {
    User,
};