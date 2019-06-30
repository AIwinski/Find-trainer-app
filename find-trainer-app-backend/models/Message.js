const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
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
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }
});

module.exports = mongoose.model("Message", messageSchema);
