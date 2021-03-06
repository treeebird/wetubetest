import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createAt: Date,
    hashtags: [{ type: String}],
    meta: {
        views: Number,
        rating: Number
    }
});

videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags.split(",").map(word => word.startsWith("#") ? word : `#${word}`)
});


const Video = mongoose.model("Video", videoSchema);

export default Video;