const Educator = require("../models/educator");
const catchAsync=require("../utils/catchAsync");
const AppError=require("../utils/appError");

exports.createEducator =catchAsync( async (req, res, next) => {
    let educator = await Educator.findOne({ email:req.body.email});
    if (!educator) {
        const newEducator = await Educator.create(req.body);
        await newEducator.save();
        newEducator.password = undefined;
        res.status(201).json({
          status: "success",
          data: {
            user: newEducator,
          },
        });
      }
    else{
        return next(new AppError("Educator already Exists", 400));
    }
  });

  exports.readEducator = catchAsync(async (req,res,next)=>
{
  const educator = await Educator.findById(req.params.educatorId);
  res.status(200).json({
    status: "success",
    data: { educator },
  });
})

exports.updateEducator = catchAsync(async (req, res, next) => {
  try {
    let educator = req.Educator;
    // console.log(req.body);
    const { name, email, password, address,description} = req.body;
    // const NewUser = {};
    // if (name) {
    //   NewUser.name = name;
    // }
    // if (email) {
    //   NewUser.email = email;
    // }
    // if (password) {
    //   NewUser.password = password;
    // }
    currEducator = await Educator.findOne(educator._id);
    currEducator.overwrite({
      name: name,
      email: email,
      password: password,
      address: address,
      description:description
    });
    await currEducator.save();
    currEducator.password=undefined;
    req.Educator=currEducator;
    // console.log(curruser);
    res.status(200).json({
      status: "success",
      data: {
        educator: currEducator
      },
    });
  } catch (err) {
    return next(new AppError("Something went wrong while Updating", 401));
  }
});

exports.hasAuthorization = catchAsync(async (req, res, next) => {
  //console.log(req.user);
  const authorized = req.Educator && req.params.educatorId == req.Educator._id;
  if (!authorized) {
    return next(new AppError("User is Not Authorized", 401));
  }
  next();
});

exports.removeEducator = async (req, res) => {
  try {
    let Educator = req.Educator;
    let deletedEducator = await Educator.deleteOne({ _id: Educator._id });
    res.status(200).json({
      status: "success",
      data: {
        deletedEducator,
      },
    });
  } catch (err) {
    return next(new AppError("Something went wrong while Updating", 401));
  }
};