const catchAsync = require("../utils/catchAsync");
const Course = require("../models/course");


exports.editBasicsLesson = catchAsync(async (req, res, next) => {
  const course = req.Course;
  // console.log(course.lessons);
  const { nameUpdate, descriptionUpdate } = req.body;
  //   try {
  const currcourse = await Course.findById(course._id);
  const lesson = currcourse.lessons.id(req.params.lessonId);
  lesson.name = nameUpdate;
  lesson.description = descriptionUpdate;
  await currcourse.save();
  // lesson.name=name
  // lesson.description=description
  // await currcourse.save();
  res.status(201).json({
    status: "success",
    // jwt: token,
    data: {
      course: currcourse,
    },
  });
  //   } catch (e) {
  //     return next(new AppError(e + "Something went wrong", 403));
  //   }
});
exports.newLesson = catchAsync(async (req, res, next) => {
  const lesson = {
    name: req.body.name,
    description: req.body.description,
    resourceUrl: req.body.resourceUrl,
  };
  // console.log(req.body);
  const result = await Course.findByIdAndUpdate(
    req.Course._id,
    { $push: { lessons: lesson } },
    { new: true }
  )
    .populate("instructor")
    .exec();
  res.status(201).json({
    status: "success",
    // jwt: token,
    data: {
      course: result,
    },
  });
});

exports.removeLesson = catchAsync(async (req, res, next) => {
    const course = req.Course;
    const currcourse = await Course.findById(course._id);
    await currcourse.lessons.id(req.params.lessonId).remove();
    await currcourse.save();
    res.status(201).json(
        {
            status: "Success",
            data:{
                course:currcourse
            }
        }
    )
})