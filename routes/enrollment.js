const express = require("express");
const { requiresSigninStudent } = require("../controllers/auth");
const { courseByID ,isPublished} = require("../controllers/course");
const {createEnrollment,enrollmentById,readEnrollment,isEnrolled,updateLessonStatus,createNote,isComplete,createReview} = require("../controllers/enrollment");
const {hasAuthorization}=require("../controllers/student");
const {specificStudentEnrollments}=require("../controllers/enrollment");
const {readLesson}=require("../controllers/lesson");

const router = express.Router();

router.route("/:studentId/enrollments").get(requiresSigninStudent,hasAuthorization,specificStudentEnrollments)

router.route("/enrollments/:courseId").post(requiresSigninStudent,courseByID,isPublished,createEnrollment)

router.route("/enrollments/:enrollmentId").get(requiresSigninStudent,isEnrolled,enrollmentById,readEnrollment)

router.route("/enrollment/:enrollmentId/:sectionId/:lessonId/newNote").post(requiresSigninStudent,isEnrolled,enrollmentById,createNote)

router.route("/enrollment/:enrollmentId/review").post(requiresSigninStudent,isEnrolled,enrollmentById,isComplete,createReview)
router.route("/enrollment/:enrollmentId/lessons/:LessonId").get(requiresSigninStudent,isEnrolled,enrollmentById,readLesson);

module.exports = router;