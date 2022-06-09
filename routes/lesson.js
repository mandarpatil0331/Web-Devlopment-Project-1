const express = require("express");
const router = express.Router();
const {requiresSigninEducator} = require("../controllers/auth");
const { courseByID,isInstructor,isUnpublished } = require("../controllers/course");
const {newLesson,editBasicsLesson,removeLesson}=require("../controllers/lesson");


router
  .route("/courses/:courseId/:SectionId/lessons")
  .post(requiresSigninEducator, courseByID, isInstructor, newLesson);
router
  .route("/courses/:courseId/:SectionId/lessons/:LessonId")
  .put(
    requiresSigninEducator,
    courseByID,
    isUnpublished,
    isInstructor,
    editBasicsLesson
  )
  .delete(
    requiresSigninEducator,
    courseByID,
    isUnpublished,
    isInstructor,
    removeLesson
  );

  module.exports = router;