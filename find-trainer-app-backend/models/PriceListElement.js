const mongoose = require("mongoose");

const priceListElementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    service: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isMinimalPrice: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("PriceListElement", priceListElementSchema);
