const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    date: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        required: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Rating", ratingSchema);
