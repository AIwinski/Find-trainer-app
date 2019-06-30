const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: false
    },
    account_verification_token: String,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: ""
    },
    registration_date: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    },
    images: [
        {
            type: String
        }
    ],
    popularity: {
        type: Number,
        default: 0
    },
    account_complete: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    number_of_ratings: {
        type: Number,
        default: 0
    },
    is_premium: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", function(next) {
    let complete = 0;
    if (this.description.length.trim() > 0) {
        complete++;
    }
    if (this.city.length.trim() > 0) {
        complete++;
    }
    if (this.images.length > 0) {
        complete++;
    }
    if(this.avatar.length.trim() > 0){
        complete++;
    }

    if(complete >= 3) {
        this.account_complete = true;
    }

    next();
});

module.exports = mongoose.model("User", userSchema);
