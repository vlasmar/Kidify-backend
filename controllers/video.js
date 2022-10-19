const { Video } = require("../models/video");

const createVideo = async (req, res, next) => {
    try{
        const { body } = req;
        const video = await Video.create(body);
        res.json(video);
    } catch (error) {
        res.json ({message: error.message});
    }
}

const getVideo = async (req, res, next) => {
    try{
        const { id } = req.params;
        const video = await Video.findById(id);
        res.json(video);
    } catch (error) {
        res.json ({message: error.message});
    }
};

const getVideos = async (req, res, next) => {
    try{
        const videos = await Video.find({});
        res.json(videos);
    } catch (error) {
        res.json ({message: error.message});
    }
};

const deleteVideo = async (req, res, next) => {
    try{
        const { id } = req.params;
        const video = await Video.findByIdAndRemove(id);
        res.json(video);
    } catch (error) {
        res.json ({message: error.message});
    }
};


module.exports = {
    createVideo,
    getVideo,
    getVideos,
    deleteVideo,
};
