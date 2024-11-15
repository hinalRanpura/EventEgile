const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Caterer = require("../models/catererModel");
const cloudinary = require("cloudinary");
const ErrorHander = require("../utils/errorhander");

//create food plan -- Manager
exports.createCaterer = catchAsyncErrors(async (req, res, next) => {
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
            folder: "caterer",
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
   
    const caterer = await Caterer.create(req.body);


    res.status(200).json({
        success: true,
        caterer
    })
});

//delete caterer --MANAGER ADMIN
exports.deleteCaterer = catchAsyncErrors(async (req, res, next) => {

    const caterer = await Caterer.findById(req.params.id);

    //delete Caterers from cloudinary
    for (let i = 0; i < caterer.images.length; i++) {
        await cloudinary.v2.uploader.destroy(caterer.images[i].public_id)
    }


    if (!caterer) {
        return next(new ErrorHander("caterer not found", 500));
    }

    await caterer.remove();

    res.status(200).json({
        success: true,
        message: "caterer deleted successfully"
    })
});

// Get caterer -- MANAGER
exports.getCaterer = catchAsyncErrors(async (req, res, next) => {
    const caterers = await Caterer.find({ user: req.user._id });
    if (!caterers) {
        return next(new ErrorHander("caterer not found", 404));
    }

    res.status(200).json({
        success: true,
        caterers,
    });
});

//update Caterer -- manager
exports.updateCaterer = catchAsyncErrors(async (req, res, next) => {

    let caterer = Caterer.findById(req.params.id);

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
            folder: "caterer",
          });
    
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
    
        req.body.images = imagesLinks;
      }

    if (!caterer) {
        return next(new ErrorHander("Caterer not found", 500));
    }    

    caterer = await Caterer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        caterer
    })
});

//get all caterer --ALL
exports.getAllCaterer = catchAsyncErrors(async (req, res, next) => {
    const caterers = await Caterer.find();

    res.status(200).json({
        success: true,
        caterers,
    })
});


//get details By Id
exports.getCatererDetail = catchAsyncErrors(async (req,res,next) => {
    const caterer = await Caterer.findById(req.params.id);
    if (!caterer) {
        return next(new ErrorHander("caterer not found", 404));
    }

    res.status(200).json({
        success: true,
        caterer,
    });
})

//get details By Id
exports.getCatByManagerId = catchAsyncErrors(async (req,res,next) => {
    const caterers = await Caterer.find({ user: req.params.id });
    if (!caterers) {
        return next(new ErrorHander("caterers not found", 404));
    }

    res.status(200).json({
        success: true,
        caterers,
    });
})