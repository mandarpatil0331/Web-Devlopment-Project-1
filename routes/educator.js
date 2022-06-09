const express = require("express");
const { requiresSigninEducator } = require("../controllers/auth");
const {
  createEducator,
  readEducator,
  updateEducator,
  removeEducator,
  hasAuthorizationEducator,
} = require("../controllers/educator");
const {
  createCourse,
  unpublishedCourses,
  specificEducatorPublishedCourses,
  courseByID,
  removeCourse,
  isPublished,
  changePublishStatus,
  isUnpublished,
  editBasics,
} = require("../controllers/course");

const router = express.Router();

router.route("/educator").post(createEducator);
router
  .route("/educator/:educatorId")
  .get(readEducator)
  .put(requiresSigninEducator, hasAuthorizationEducator, updateEducator)
  .delete(requiresSigninEducator, hasAuthorizationEducator, removeEducator);

router
  .route("/educator/:educatorId/createCourse")
  .post(requiresSigninEducator, hasAuthorizationEducator, createCourse);



module.exports = router;
