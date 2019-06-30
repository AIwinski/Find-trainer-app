const mongoose = require("mongoose");

const priceListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    elements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PriceListElement"
    }]
});

module.exports = mongoose.model("PriceList", priceListSchema);
