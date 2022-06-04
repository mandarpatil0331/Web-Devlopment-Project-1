const express = require("express");
const { requiresSigninEducator } = require("../controllers/auth");
const {createEducator,readEducator,updateEducator,removeEducator,hasAuthorization} =require("../controllers/educator");
const {createCourse}=require("../controllers/course");

const router = express.Router();

router.route('/educator').post(createEducator);
router.route('/educator/:educatorId').get(readEducator)
.put(requiresSigninEducator,hasAuthorization,updateEducator)
.delete(requiresSigninEducator,hasAuthorization,removeEducator);

router.route('/educator/:educatorId/createCourse').post(requiresSigninEducator,hasAuthorization,createCourse)

module.exports = router;