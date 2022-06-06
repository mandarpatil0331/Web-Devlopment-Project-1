const express = require("express");
const { requiresSigninEducator,requiresSigninStudent } = require("../controllers/auth");
const { hasAuthorizationEducator } = require("../controllers/educator");
const { hasAuthorization } = require("../controllers/student");
const {
  unpublishedCourses,
  editBasics,
  courseByID,
  removeCourse,
  isUnpublished,
  isInstructor,
  publishedCourses,
  specificEducatorPublishedCourses,
  isPublished,
  changePublishStatus,
  studentEnrollments
} = require("../controllers/course");
const {
  newLesson,
  editBasicsLesson,
  removeLesson,
} = require("../controllers/lesson");


const router = express.Router();

router.route("/courses").get(publishedCourses);
//Create
//Lessons,Enrollments,Photos
router.route("/courses/:studentId").get(requiresSigninStudent,hasAuthorization,studentEnrollments)
router
  .route("/courses/:educatorId/unpublished")
  .get(requiresSigninEducator, hasAuthorizationEducator, unpublishedCourses);
router
  .route("/courses/:educatorId/published")
  .get(
    requiresSigninEducator,
    hasAuthorizationEducator,
    specificEducatorPublishedCourses
  );

router
  .route("/courses/:courseId/lessons")
  .post(requiresSigninEducator, courseByID, isInstructor, newLesson);
router
  .route("/courses/:courseId/lessons/:lessonId")
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

// router.route("/api/courses/image/:courseId").get(imgCourse);
//Update
//Photos,Lessons,Enrollments,published
router
  .route("/courses/:educatorId/published/:courseId")
  .put(
    requiresSigninEducator,
    hasAuthorizationEducator,
    courseByID,
    isPublished,
    changePublishStatus
  );
router
  .route("/courses/:educatorId/unpublished/:courseId/basics")
  .put(
    requiresSigninEducator,
    hasAuthorizationEducator,
    courseByID,
    isUnpublished,
    editBasics
  );

//Delete
//Photo,Enrollment,Lesson,
router
  .route("/courses/:educatorId/:courseId")
  .delete(requiresSigninEducator, hasAuthorizationEducator, courseByID, removeCourse);

module.exports = router;
