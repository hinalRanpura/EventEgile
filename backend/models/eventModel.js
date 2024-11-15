const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    venueAddedBy: [
        {
            user : {
                type: String,
                required: [true, "Not getting User"]
            }
        }
    ],
    paidAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    taxPrices: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    numOfGuest: {
        type: Number,
        required: true
    },
    timeSlot: 
    [
        {
        type: String,
        required: true
    }
    ],
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    bookedAt: {
        type: Date,
        default: Date.now
    },
    eventAt: {
        type: Date,
        required: true
    },
    eventStatus: {
        type: String,
        required: true,
        default:"Upcoming Event"
    },
    bookedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    paidAt: {
        type: Date,
        required: true,
    },
    venue: {
        type: mongoose.Schema.ObjectId,
        ref: "Venue",
        required: true,
    },
    venueName : {
        type: String,
        required: [true, "Not getting venue Name"]
    }
    ,
    venueAddress : {
        type: String,
        required: [true, "Not getting venue address"]
    }
    ,
    venuePrice : {
        type: Number,
        required: [true, "Not venue price"]
    },
    decoType : {
        type: String,
        required: [true, "Not deco Type"]
    },
    funcType : {
        type: String,
        required: [true, "Not function Type"]
    },
    decoPrice : {
        type: Number,
        required: [true, "Not deco Price"]
    },
    catType : {
        type: String,
        required: [true, "Not catrerr Type"]
    },
    catPrice : {
        type: Number,
        required: [true, "Not catrer Price"]
    },
});

module.exports = mongoose.model("Event", eventSchema);