const express = require("express");
const router = express.Router();
const {
  requiresSigninEducator,
  requiresSigninStudent,
} = require("../controllers/auth");
const {
  courseByID,
  isInstructor,
  isUnpublished,
} = require("../controllers/course");
const {
  newLesson,
  editLesson,
  removeLesson,
  newVideoUpload,
} = require("../controllers/lesson");
const multer  = require('multer')
const upload = multer();

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
    upload.single('lessonVideo'),
    editLesson
  )
  .delete(
    requiresSigninEducator,
    courseByID,
    isUnpublished,
    isInstructor,
    removeLesson
  );

router
  .route("/courses/:courseId/:SectionId/:LessonId/video")
  .post(
    requiresSigninEducator,
    courseByID,
    isUnpublished,
    isInstructor,
    newVideoUpload
  );

module.exports = router;
