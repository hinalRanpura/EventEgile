const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");
const ErrorHander  = require("../utils/errorhander");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"profile",
        width: 150,
        crop: "scale",
    });
  
    const{name,email,password,phone,role} = req.body;

    const user = await User.create({
        name,
        email,
        role,
        password,
        phone,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        },
    });


    sendToken(user,201,res);
});


//login
exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    const {email,password} = req.body;

    //checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHander("please enter email & password",400));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }

    sendToken(user,200,res);
});

//Logout
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });
    
    res.status(200).json({
        success:true,
        message:"Logged out"
    });
});


//forgot password
exports.forgotPassword = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHander("User not found",404));
    }

    //Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave : false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Your Password reset token is : \n\n ${resetPasswordUrl} \n\nIt is system Generated message please do not reply \n\n If you have not requested please ignore it`

    try{
        await sendEmail({
            email: user.email,
            subject: `Event Agile Password Recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} succesfully`,
        })
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHander(error.message,500));
    }
})


//Reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    
    //creating token hash
    const resetPasswordToken = crypto
                    .createHash("sha256")
                    .update(req.params.token)
                    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt: Date.now() },
    });

    if(!user) {
        return next(new ErrorHander("Reset Password Token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not password",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);
})


//get user detail
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    });
})

//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHander ("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHander ("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    res.status(200).json({
        success:true,
    })
  });

//update user profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }

    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;
        
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"profile",
            width: 150,
            crop: "scale",
        });
        newUserData.avatar = {
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }    
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
    })
})


//get all user (Admin)
exports.getAllUser = catchAsyncErrors(async(req,res,next) =>{
    const users  = await User.find();

    res.status(200).json({
        success:true,
        users,
    });
})

//get single user (Admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next) =>{
    const user  = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander (`user does not exist with id : ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user,
    });
})

//update user role --Admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    
    const newUserData={
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    sendToken(user,200,res)
})

//delete user --Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander (`user does not exits with id : ${req.params.id}`))
    }

  
    const imageId = user.avatar.public_id;
        
    await cloudinary.v2.uploader.destroy(imageId);

    
    await user.remove();

    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    });
});

