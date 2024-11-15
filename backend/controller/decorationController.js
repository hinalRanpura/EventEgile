const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Decoration = require("../models/decorationModel");
const cloudinary = require("cloudinary");
const ErrorHander = require("../utils/errorhander");

//create food plan -- Manager
exports.createDecoration = catchAsyncErrors(async (req, res, next) => {
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
            folder: "decoration",
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

    const decoration = await Decoration.create(req.body);


    res.status(200).json({
        success: true,
        decoration
    })
});

//delete decoration --MANAGER ADMIN
exports.deleteDecoration = catchAsyncErrors(async (req, res, next) => {

    const decoration = await Decoration.findById(req.params.id);

    //delete Decorations from cloudinary
    for (let i = 0; i < decoration.images.length; i++) {
        await cloudinary.v2.uploader.destroy(decoration.images[i].public_id)
    }


    if (!decoration) {
        return next(new ErrorHander("decoration not found", 500));
    }

    await decoration.remove();

    res.status(200).json({
        success: true,
        message: "decoration deleted successfully"
    })
});

// Get decoration -- MANAGER
exports.getDecoration = catchAsyncErrors(async (req, res, next) => {
    const decorations = await Decoration.find({ user: req.user._id });
    if (!decorations) {
        return next(new ErrorHander("Decoration not found", 404));
    }

    res.status(200).json({
        success: true,
        decorations,
    });
});

//update decoration -- manager
exports.updateDecoration = catchAsyncErrors(async (req, res, next) => {

    let decoration = Decoration.findById(req.params.id);

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
            folder: "Decoration",
          });
    
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
    
        req.body.images = imagesLinks;
      }

    if (!decoration) {
        return next(new ErrorHander("decoration not found", 500));
    }    

    decoration = await Decoration.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        decoration
    })
});

//get all decoration --ALL
exports.getAllDecoration = catchAsyncErrors(async (req, res, next) => {
    const decorations = await Decoration.find();

    res.status(200).json({
        success: true,
        decorations,
    })
});


//get details By Id
exports.getDecorationByManagerId = catchAsyncErrors(async (req,res,next) => {
    const decorations = await Decoration.find({ user: req.params.id });
    if (!decorations) {
        return next(new ErrorHander("decoration not found", 404));
    }

    res.status(200).json({
        success: true,
        decorations,
    });
})

//get details By manager Id
exports.getDecorationDetail = catchAsyncErrors(async (req,res,next) => {
    const decoration = await Decoration.findById(req.params.id);
    if (!decoration) {
        return next(new ErrorHander("decoration not found", 404));
    }

    res.status(200).json({
        success: true,
        decoration,
    });
})