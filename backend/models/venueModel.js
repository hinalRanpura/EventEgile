const mongoose = require("mongoose");

const venueSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plese Enter venue Name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Plese Enter venue Description"]
    },
    price: {
        type: Number,
        required: [true, "Plese Enter venue Price"],
        maxLength: [7, "Price can not more than 7 characters"],
    },
    address: {
        type: String,
        required: [true, "Plese Enter venue Address"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    capacity: {
        type: Number,
        required: [true, "Please Enter venue maximun capacity"],
        maxLength: [4, "capacity cannot exeed 4 charactes"],
        default: 100
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    userName: {
        type: String,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Venue", venueSchema);