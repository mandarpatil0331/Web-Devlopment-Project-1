const Course = require("../models/course");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createCourse = catchAsync(async (req, res, next) => {
  const course = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    instructor: req.Educator._id,
  };
  const newCourse = await Course.create(course);
  await newCourse.save();
  res.status(201).json({
    status: "success",
    // jwt: token,
    data: {
      course: newCourse,
    },
  });
});

exports.unpublishedCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find({
    instructor: req.Educator._id,
    published: false,
  }).populate("instructor");
  if (!courses) {
    return next(new AppError("No Courses Found", 401));
  }
  res.status(201).json({
    status: "success",
    // jwt: token,
    data: {
      courses: courses,
    },
  });
});

exports.courseByID = catchAsync(async (req, res, next) => {
  //console.log(req.params.courseId);
  const course = await Course.findById(req.params.courseId);
  // console.log(course);
  if (!course) {
    return next(new AppError("Course Not Found", 401));
  }
  req.Course = course;
  next();
});

exports.editBasics = catchAsync(async (req, res, next) => {
  const course = req.Course;
  // console.log(course.lessons);
  const { name, category, description } = req.body;
  try {
    currcourse = await Course.findByIdAndUpdate(
      course._id,
      { name: name, category: category, description: description },
      { runValidators: true, returnDocument: "after" }
    );
    await currcourse.save();
    res.status(201).json({
      status: "success",
      // jwt: token,
      data: {
        course: currcourse,
      },
    });
  } catch (e) {
    return next(new AppError(e + "Something went wrong", 403));
  }
});

exports.removeCourse = catchAsync(async (req, res, next) => {
  let course = req.Course;
  let deletedCourse = await Course.deleteOne({ _id: course._id });
  res.status(200).json({
    status: "success",
    data: {
      deletedCourse,
    },
  });
});

exports.isPublished = catchAsync(async (req, res, next) => {
  const isUnpublished = req.Course && req.Course.published === true;
  if (!isUnpublished) {
    return next(new AppError("Course is not Published", 401));
  }
  next();
});
exports.isUnpublished = catchAsync(async (req, res, next) => {
  const isUnpublished = req.Course && req.Course.published === false;
  if (!isUnpublished) {
    return next(new AppError("Course is Published", 401));
  }
  next();
});
exports.isInstructor = catchAsync(async (req, res, next) => {
  const isInstructor =
    req.Course &&
    req.Educator &&
    JSON.stringify(req.Course.instructor._id) ==
      JSON.stringify(req.Educator._id);
  if (!isInstructor) {
    return next(new AppError("Educator is not Authorised", 401));
  }
  next();
});

exports.imgCourse = catchAsync(async (req, res, next) => {
  // console.log(req.course.image.contentType);
  if (req.Course.image.data) {
    res.set("Content-Type", req.Course.image.contentType);
    return res.send(req.Course.image.data);
  }
});
