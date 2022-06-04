const express = require("express");
const { requiresSigninStudent } = require("../controllers/auth");
const { courseByID ,isPublished} = require("../controllers/course");
const {createEnrollment,enrollmentById,readEnrollment,isEnrolled,updateLessonStatus,createNote,isComplete,createReview} = require("../controllers/enrollment");

const router = express.Router();

router.route("/enrollments/:courseId").post(requiresSigninStudent,courseByID,isPublished,createEnrollment)

router.route("/enrollments/:enrollmentId").get(requiresSigninStudent,isEnrolled,enrollmentById,readEnrollment)

router.route("/enrollment/:enrollmentId/:lessonId/newNote").post(requiresSigninStudent,isEnrolled,enrollmentById,createNote)

router.route("/enrollment/:enrollmentId/review").post(requiresSigninStudent,isEnrolled,enrollmentById,isComplete,createReview)

router.route("/enrollments/:enrollmentId/:lessonId/complete").put(requiresSigninStudent,isEnrolled,enrollmentById,updateLessonStatus)

module.exports = router;