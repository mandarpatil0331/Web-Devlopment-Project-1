const express = require("express");
const {createStudent,readStudent,updateStudent,hasAuthorization,removeStudent}=require("../controllers/student");
const {requiresSigninStudent } = require("../controllers/auth");
const {studentEnrollments}=require("../controllers/course");

const router = express.Router();

router.route('/student').post(createStudent);

router.route('/student/:studentId').get(readStudent)
.put(requiresSigninStudent,hasAuthorization,updateStudent)
.delete(requiresSigninStudent,hasAuthorization,removeStudent);


//enrollment deletaions are not removed still
module.exports = router;