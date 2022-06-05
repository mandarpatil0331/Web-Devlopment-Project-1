const express = require("express");
const { requiresSigninEducator } = require("../controllers/auth");
const { hasAuthorization } = require("../controllers/educator");
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
router
  .route("/courses/:educatorId/unpublished")
  .get(requiresSigninEducator, hasAuthorization, unpublishedCourses);
router
  .route("/courses/:educatorId/published")
  .get(
    requiresSigninEducator,
    hasAuthorization,
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
    hasAuthorization,
    courseByID,
    isPublished,
    changePublishStatus
  );
router
  .route("/courses/:educatorId/unpublished/:courseId/basics")
  .put(
    requiresSigninEducator,
    hasAuthorization,
    courseByID,
    isUnpublished,
    editBasics
  );

//Delete
//Photo,Enrollment,Lesson,
router
  .route("/courses/:educatorId/:courseId")
  .delete(requiresSigninEducator, hasAuthorization, courseByID, removeCourse);

module.exports = router;
