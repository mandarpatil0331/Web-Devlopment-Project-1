const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Course = require("../models/course");
const Section = require("../models/section");
const Lesson = require("../models/lesson");

exports.readLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.LessonId);
  const section = await Section.findById(lesson.section);
  const course = await Course.findById(section.course);
  if(JSON.stringify(course._id) === JSON.stringify(req.Enrollment.course._id)) {
  res.status(200).json({
    status: "success",
    data: {
      lesson,
    },
  });
} else
{
  return next(new AppError("You are not enrolled in this course", 401));
}});


exports.editBasicsLesson = catchAsync(async (req, res, next) => {
  const course = req.Course;
  // console.log(course.lessons);
  const { nameUpdate, descriptionUpdate,timeRequired } = req.body;
  //   try {
  const currcourse = await Course.findById(course._id);
  const sectionexists = currcourse.sections.find((section) => {
    return section._id === req.params.SectionId;
  });
  if (!sectionexists) {
    const currSection = await Section.findById(req.params.SectionId);
    const lessonexists = currSection.lessons.find(
      (lesson) => lesson._id === req.params.LessonId
    );
    if (!lessonexists) {
      const lesson = await Lesson.findById(req.params.LessonId);
      lesson.name = nameUpdate;
      lesson.description = descriptionUpdate;
      await lesson.save();
    } else {
      return next(new AppError("Lesson not found", 403));
    }
    currSection.totalTime=currSection.totalTime+timeRequired;
  } else {
    return next(new AppError("Section not found", 403));
  }
  res.status(201).json({
    status: "success",
    // jwt: token,
    data: {
      course: req.Course,
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
    timeRequired: req.body.timeRequired,
    section: req.params.SectionId,
  };
  // console.log(req.body);
  const newLesson = await Lesson.create(lesson);
  const sectionexists = req.Course.sections.find(
    (section) => section._id == req.params.SectionId
  );
  if (sectionexists) {
    const currSection = await Section.findById(req.params.SectionId);
    currSection.lessons.push(newLesson);
    // currSection.totalTime=currSection.totalTime+timeRequired;
    await currSection.save();
    res.status(201).json({
      status: "success",
      // jwt: token,
      data: {
        course: req.Course,
      },
    });
  } else {
    return next(new AppError("Section not found", 403));
  }
});

exports.removeLesson = catchAsync(async (req, res, next) => {
  const course = req.Course;
  const currSection = await Section.findById(req.params.SectionId);
  const lesson = await Lesson.findById(req.params.LessonId);
  currSection.lessons.pull(lesson);
  currSection.totalTime=currSection.totalTime-lesson.timeRequired;
  await currSection.save();
  await lesson.remove();
  res.status(201).json({
    status: "Success",
    data: {
      course: req.Course,
    },
  });
});
