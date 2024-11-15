const Venue = require("../models/venueModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary")


//create venue -- manager
exports.createVenue = catchAsyncErrors(async (req, res, next) => {

    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    }
    else {
        images = req.body.images;
    }

    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "venue",
            height: 450,
            crop: "scale",
        });

        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imageLinks;
    req.body.user = req.user.id;

    const venue = await Venue.create(req.body);

    res.status(200).json({
        success: true,
        venue
    })
});

//get all venue
exports.getAllVenues = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const venueCount = await Venue.countDocuments();

    const apiFeature = new ApiFeatures(Venue.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const venues = await apiFeature.query;

    res.status(200).json({
        success: true,
        venues,
        venueCount,
        resultPerPage
    })
});

//update venue -- manager
exports.updateVenue = catchAsyncErrors(async (req, res, next) => {

    let venue = Venue.findById(req.params.id);

     // Images Start Here
     let images = [];
  
     if (typeof req.body.images === "string") {
       images.push(req.body.images);
     } else {
       images = req.body.images;
     }
   
     
    if (images !== undefined) {
      /*  // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
    */
        const imagesLinks = [];
    
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "venue",
          });
    
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
    
        req.body.images = imagesLinks;
      }

    if (!venue) {
        return next(new ErrorHander("venue not found", 500));
    }    

    venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        venue
    })
});

//get all venue --ADMIN
exports.getAdminVenues = catchAsyncErrors(async (req, res, next) => {
    const venues = await Venue.find();

    res.status(200).json({
        success: true,
        venues,
    })
});

//delete venue
exports.deleteVenue = catchAsyncErrors(async (req, res, next) => {

    const venue = await Venue.findById(req.params.id);

    //delete venues from cloudinary
    for (let i = 0; i < venue.images.length; i++) {
        await cloudinary.v2.uploader.destroy(venue.images[i].public_id)
    }


    if (!venue) {
        return next(new ErrorHander("venue not found", 500));
    }

    await venue.remove();

    res.status(200).json({
        success: true,
        message: "Venue deleted successfully"
    })
});

// Get venue -- MANAGER
exports.getVenue = catchAsyncErrors(async (req, res, next) => {
    const venues = await Venue.find({ user: req.user._id });
    if (!venues) {
        return next(new ErrorHander("venue not found", 404));
    }

    res.status(200).json({
        success: true,
        venues,
    });
});

// Get venue Details
exports.getVenueDetails = catchAsyncErrors(async (req, res, next) => {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
        return next(new ErrorHander("venue not found", 404));
    }

    res.status(200).json({
        success: true,
        venue,
    });
});

//create new review or update the review
exports.createVenueReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, venueId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };   

    const venue = await Venue.findById(venueId);

    const isReviewed = venue.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        venue.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating),
                    (rev.comment = comment)
        })
    }
    else {
        venue.reviews.push(review)
        venue.numOfReviews = venue.reviews.length;
    }

    let avg = 0;

    venue.reviews.forEach((rev) => {
        avg += rev.rating
    })

    venue.ratings = avg / venue.reviews.length;

    await venue.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});

//get all reviews of a venue
exports.getVenueReviews = catchAsyncErrors(async (req, res, next) => {
    const venue = await Venue.findById(req.query.id);

    if (!venue) {
        return next(new ErrorHander("Reviews not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: venue.reviews,
    });
});

