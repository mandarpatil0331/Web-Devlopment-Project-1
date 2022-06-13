const express = require("express");
const router = express.Router();
const { requiresSigninEducator } = require("../controllers/auth");
const {courseByID,isInstructor,isUnpublished} = require("../controllers/course");
const {newSection,editSectionName,removeSection}=require("../controllers/section");

router
  .route("/courses/:courseId/sections")
  .post(requiresSigninEducator, courseByID, isInstructor, newSection);
router
  .route("/courses/:courseId/sections/:sectionId")
  .put(
    requiresSigninEducator,
    courseByID,
    isUnpublished,
    isInstructor,
    editSectionName
  )
  .delete(
    requiresSigninEducator,
    courseByID,
    isUnpublished,
    isInstructor,
    removeSection
  );

  module.exports = router;