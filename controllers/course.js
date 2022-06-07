const Course = require("../models/course");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Student = require("../models/student");
const Enrollment = require("../models/enrollment");

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
  const LIMIT=3
  const Sort_select=req.query.sort_select;
  page=req.query.page||1;
  const totalUnpublishedInstructorCourses = await Course.countDocuments({published:false,instructor:req.Educator._id});
  const courses = await Course.find({
    instructor: req.Educator._id,
    published: false,
  }).sort(`${Sort_select}`).skip((page-1)*LIMIT).limit(LIMIT).populate("instructor");
  if (!courses) {
    return next(new AppError("No Courses Found", 401));
  }
  res.status(201).json({
    status: "success",
    numberOfPages: Math.ceil(totalUnpublishedInstructorCourses / LIMIT),
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

exports.publishedCourses = catchAsync(async(req, res) => {
  page=req.query.page || 1;
  let Sort_select=req.query.sort_select;
  const LIMIT = 4;
  const totalPublishedCourses = await Course.countDocuments({published:true});
  const courses = await Course.find({published:true}).sort( `${Sort_select}` ).skip((page-1)*LIMIT).limit(LIMIT).populate("instructor");
  res.status(201).json({
    status: "success",
    numberOfPages: Math.ceil(totalPublishedCourses / LIMIT),
    // jwt: token,
    data: {
      courses: courses,
    },
  })
})

exports.specificEducatorPublishedCourses = catchAsync(async(req, res) => {
  page=req.query.page || 1;
  let Sort_select=req.query.sort_select;
  const LIMIT = 4;
  const totalPublishedInstructorCourses = await Course.countDocuments({published:true,instructor:req.Educator._id});
  const courses = await Course.find({published:true,instructor: req.Educator._id}).sort( `${Sort_select}` ).skip((page-1)*LIMIT).limit(LIMIT).populate("instructor");
  res.status(201).json({
    status: "success",
    // jwt: token,
    numberOfPages: Math.ceil(totalPublishedInstructorCourses / LIMIT),
    data: {
      courses: courses,
    },
  })
})

exports.changePublishStatus=catchAsync(async (req, res, next) => {
  //remove all enrollemnts related to course first
  const currCourse = await Course.findByIdAndUpdate(
    req.Course._id,
    { published:false },
    { runValidators: true, returnDocument: "after" }
  );
  await currCourse.save();
  res.status(201).json({
    status: "success",
    // jwt: token,
    data: {
      course: currCourse,
    },
  })
});
exports.studentEnrollments = catchAsync(async (req, res, next) => {
  const student = req.Student
  const enrollment =await Enrollment.find({student:student._id}).populate({path:'course'});
  res.status(201).json({
  status: "success",
  // jwt: token,
  data: {
    enrollments: enrollment
  },
})
});

