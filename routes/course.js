const express = require("express");
const {
  requiresSigninEducator,
  requiresSigninStudent,
} = require("../controllers/auth");
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
  studentEnrollments,
  publicSpecificCourse,
  unpublishedSpecificCourse
} = require("../controllers/course");
const {
  newLesson,
  editBasicsLesson,
  removeLesson,
} = require("../controllers/lesson");

const router = express.Router();

//For All
router.route("/courses").get(publishedCourses);

router.route("/courses/:CourseId").get(publicSpecificCourse);

//For Educator

router
  .route("/courses/:educatorId/unpublished")
  .get(requiresSigninEducator, hasAuthorizationEducator, unpublishedCourses);

//UnpublishedCourseSpecific
router
  .route("/courses/:educatorId/unpublished/:courseId")
  .get(
    requiresSigninEducator,
    hasAuthorizationEducator,
    courseByID,
    isUnpublished,
    unpublishedSpecificCourse
  )
  .put(
    requiresSigninEducator,
    hasAuthorizationEducator,
    courseByID,
    isUnpublished,
    editBasics
  )

//PublishStatusUpdate
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
  .route("/courses/:educatorId/published")
  .get(
    requiresSigninEducator,
    hasAuthorizationEducator,
    specificEducatorPublishedCourses
  );

router
  .route("/courses/:educatorId/:courseId")
  .delete(
    requiresSigninEducator,
    hasAuthorizationEducator,
    courseByID,
    removeCourse
  );

//For Student


// router.route("/api/courses/image/:courseId").get(imgCourse);
//Update
//Photos,Lessons,Enrollments,published

//Delete
//Photo,Enrollment,Lesson,

module.exports = router;
