const Educator = require("../educator");
const jwt=require("jsonwebtoken");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const Student = require("../student");
const AppError = require("../../utils/appError");

exports.checkCredentialsStudent = async (email, password, next) => {
  try {
    const currentStudent = await Student.findOne({email}).select("+password");
    //console.log(currentUser);
    //1) find the user
    if (!currentStudent)
      throw new AppError("Your user details are wrong.", 401);

    //2) check if the current password is correct
    if (!(await currentStudent.checkPassword(password, currentStudent.password))) {
      throw new AppError("Your user details is wrong.", 401);
    }

    return currentStudent;
  } catch (err) {
      next(err);
  }
};
exports.checkCredentialsEducator = async (email, password, next) => {
    try {
      const currentEducator = await Educator.findOne({email}).select("+password");
      //console.log(currentUser);
      //1) find the user
      if (!currentEducator)
        throw new AppError("Your user details are wrong.", 401);
  
      //2) check if the current password is correct
      if (!(await currentEducator.checkPassword(password, currentEducator.password))) {
        throw new AppError("Your user details is wrong.", 401);
      }
  
      return currentEducator;
    } catch (err) {
        next(err);
    }
  };

  exports.signToken = (id) => {
    // console.log(process.env.PORT);
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  exports.protectStudent = async (token, next) => {
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      //check if user exists
      if (!decoded) {
        return next(new AppError("Your password or email is wrong", 401));
      }
      const currentStudent = await Student.findById(decoded.id);
      // console.log(currentUser);
      if (!currentStudent) {
        return next(new AppError("No user Found", 401));
      }
      // return the userData
     currentStudent.password=undefined;  
      return currentStudent;
    } catch (err) {
      next(err);
    }
  };
  exports.protectEducator = async (token, next) => {
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      //check if user exists
      if (!decoded) {
        return next(new AppError("Your password or email is wrong", 401));
      }
      const currentEducator = await Educator.findById(decoded.id);
      // console.log(currentUser);
      if (!currentEducator) {
        return next(new AppError("No user Found", 401));
      }
      // return the userData
     currentEducator.password=undefined;  
      return currentEducator;
    } catch (err) {
      next(err);
    }
  };