const mongoose = require("mongoose");

const catererSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Plese Enter Food Type"]
    },
    description: {
        type: String,
        required: [true, "Plese Enter Food Description"]
    },
    price: {
        type: Number,
        required: [true, "Plese Enter food charges"],
        maxLength: [4, "Price can not more than 4 characters"],
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
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Caterer", catererSchema);