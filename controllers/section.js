const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Course = require("../models/course");
const Section = require("../models/section");

exports.newSection = catchAsync(async (req, res, next) => {
    const section = {
      name: req.body.name,
      totalTime:0,
      course: req.params.courseId,
    };
    // console.log(req.body);
    const newSection = await Section.create(section);
    const currCourse=await Course.findById(req.Course._id);
    currCourse.sections.push(newSection);
    await currCourse.save();
    res.status(201).json({
      status: "success",
      // jwt: token,
      data: {
        course: currCourse,
      },
    });
  });

    exports.editSectionName = catchAsync(async (req, res, next) => {
        const section = await Section.findById(req.params.sectionId);
        section.name = req.body.name;
        await section.save();
        res.status(201).json({
            status: "success",
            // jwt: token,
            data: {
            course: req.Course,
            },
        });
    })

    exports.removeSection = catchAsync(async (req, res, next) => {  

        const currCourse=await Course.findById(req.Course._id);
        const section=await Section.findById(req.params.sectionId);
        currCourse.sections.pull(section);
        //Remove lessons too
        await currCourse.save();
        await section.remove();
        res.status(201).json({
            status: "success",
            // jwt: token,
            data: {
            course: req.Course,
            },
        });
    })