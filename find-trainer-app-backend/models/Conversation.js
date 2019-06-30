const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    lastModified: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Conversation", conversationSchema);
