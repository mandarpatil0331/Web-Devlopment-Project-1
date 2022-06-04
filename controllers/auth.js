const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { checkCredentialsEducator,checkCredentialsStudent, signToken,protectStudent, protectEducator } = require("../models/logic/auth");

const createSendToken = async (currentUser, statusCode, res, next) => {
  try {
    // console.log(user);
    const token = signToken(currentUser._id);
    // console.log(token);
    res.cookie("jwt", token);
    res.status(statusCode).json({
      status: "success",
      token: token,
      data: {
        user: currentUser,
      },
    });
    // console.log(res);
  } catch (error) {
    next(error);
  }
};

exports.signInEducator = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new AppError("Please provide correct user details and password", 400)
    );
  }
  const educator = await checkCredentialsEducator(email, password, next);
  educator.password = undefined;
  createSendToken(educator, 200, res, next);
});

exports.signInStudent = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new AppError("Please provide correct user details and password", 400)
      );
    }
    const student = await checkCredentialsStudent(email, password, next);
    student.password = undefined;
    createSendToken(student, 200, res, next);
  });

exports.educatorSignOut = catchAsync(async (req, res, next) => {
  const token = "Session Over";
  res.cookie("jwt", token);
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.studentSignOut = catchAsync(async (req, res, next) => {
  const token = "Session Over";
  res.cookie("jwt", token);
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.requiresSigninEducator = catchAsync(async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("Access Denied!! Please log in to get access", 401)
    );
  }
  req.Educator = await protectEducator(token, next);
  next();
});

exports.requiresSigninStudent = catchAsync(async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("Access Denied!! Please log in to get access", 401)
    );
  }
  req.Student = await protectStudent(token, next);
  next();
});

exports.loggedInStatus = (req, res) => {
  if(req.Educator){
  res.status(200).json({
    status: "success",
    isInstructor: true,
    data: { user: req.Educator },
  });
}else{
  res.status(200).json({
    status: "success",
    isInstructor: false,
    data: { user: req.Student },
  });
}
};

