const Student = require("../models/student");
const catchAsync=require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.readStudent = catchAsync(async (req,res,next)=>
{
  const student = await Student.findById(req.params.studentId);
  res.status(200).json({
    status: "success",
    data: { student },
  });
})

exports.updateStudent = catchAsync(async (req, res, next) => {
  try {
    let student = req.Student;
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
    currStudent = await Student.findOne(student._id);
    currStudent.overwrite({
      name: name,
      email: email,
      password: password,
      address: address,
      description:description
    });
    await currStudent.save();
    currStudent.password=undefined;
    req.Student=currStudent;
    // console.log(curruser);
    res.status(200).json({
      status: "success",
      data: {
        student: currStudent
      },
    });
  } catch (err) {
    return next(new AppError("Something went wrong while Updating", 401));
  }
});

exports.hasAuthorization = catchAsync(async (req, res, next) => {
  //console.log(req.user);
  const authorized = req.Student && req.params.studentId == req.Student._id;
  if (!authorized) {
    return next(new AppError("User is Not Authorized", 401));
  }
  next();
});

exports.createStudent =catchAsync( async (req, res, next) => {
    let student = await Student.findOne({ email:req.body.email});
    if (!student) {
        const newStudent = await Student.create(req.body);
        await newStudent.save();
        newStudent.password = undefined;
        res.status(201).json({
          status: "success",
          data: {
            user: newStudent,
          },
        });
      }
    else{
        return next(new AppError("Student already Exists", 400));
    }
  });

  exports.removeStudent = async (req, res) => {
    try {
      let Student = req.Student;
      let deletedStudent = await Student.deleteOne({ _id: Student._id });
      res.status(200).json({
        status: "success",
        data: {
          deletedStudent,
        },
      });
    } catch (err) {
      return next(new AppError("Something went wrong while Updating", 401));
    }
  };