const Event = require("../models/eventModel");
const Venue = require("../models/venueModel");
const user = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


//create new Event
exports.newEvent = catchAsyncErrors(async (req, res, next) => {

    const us = req.body.venueAddedBy;
    const objectId = mongoose.Types.ObjectId(us);//"63ed1a0cbaa8d71db86dedec"

    const venueAddedBy = await Venue.aggregate([
        {
            $match: { _id: objectId }
        },
        {
            $lookup: {
                from: "venues",
                localField: "venueId",
                foreignField: "_id",
                as: "venueAddedBy"
            }
        },
        {
            $project: {
                user: 1
            }
        }
    ]).exec();

    req.body.venueAddedBy = venueAddedBy;

    const {
        numOfGuest,
        totalPrice,
        taxPrices,
        funcType,
        eventAt,
        timeSlot,
        venue,
        venuePrice,
        venueName,
        venueAddress,
        decoType,
        decoPrice,
        catType,
        catPrice,
        paymentInfo
    } = req.body;

    let total = totalPrice + taxPrices;
    const event = await Event.create({
        numOfGuest,
        total,
        totalPrice,
        taxPrices,
        funcType,
        eventAt,
        timeSlot,
        venue,
        venuePrice,
        venueName,
        venueAddress,
        decoType,
        decoPrice,
        catType,
        catPrice,
        paymentInfo,
        paidAt: Date.now(),
        venueAddedBy,
        bookedBy: req.user._id,
    });

    res.status(201).json({
        success: true,
        event,
    })
})

// get Single Event
exports.getSingleEvent = catchAsyncErrors(async (req, res, next) => {
    const event = await Event.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!event) {
        return next(new ErrorHander("event not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        event,
    });
});


// get logged in user  Events who have booked --USER
exports.myEvents = catchAsyncErrors(async (req, res, next) => {
    const events = await Event.find({ bookedBy: req.user._id });

    res.status(200).json({
        success: true,
        events,
    });
});


// get all events -- Admin
exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {
    const events = await Event.find();
   
    let totalAmount = 0;

    events.forEach((event) => {
        totalAmount += event.total;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        events,
    });
});

// get Events for particullar venue --Manager
exports.venueEvents = catchAsyncErrors(async (req, res, next) => {

    const objectId = new ObjectId(req.user._id); // Example ObjectId
    const stringId = objectId.toString();
    const events = await Event.aggregate([
        { $match: { "venueAddedBy.user": stringId } },
      ])
   
    res.status(200).json({
        success: true,
        events,
    });
});
     

//update Event --MANAGER ADMIN
exports.updateEvent = catchAsyncErrors(async(req,res,next) => {
    
    const event = await Event.findById(req.params.id);


    if(!event){
        return next(new ErrorHander("Event not Found with this id",404));
    }

    
    if(event.eventStatus === "Completed")
    {
        return next(new ErrorHander("This event is completed",400))
    }

    event.eventStatus = req.body.type;

    await event.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
})

//Delete Event --Admin
exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    await event.remove();

    if(!event){
        return next(new ErrorHander("Event not Found with this id",404));
    }

    res.status(200).json({
        success: true
    });
});