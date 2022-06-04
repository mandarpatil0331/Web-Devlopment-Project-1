const express = require("express");
const { signInEducator,requiresSigninEducator,educatorSignOut,signInStudent,requiresSigninStudent,studentSignOut } = require("../controllers/auth");



const router = express.Router();

router.route("/auth/educator/signin").post(signInEducator);
router.route("/auth/educator/signOut").get(requiresSigninEducator, educatorSignOut);
router.route("/auth/student/signin").post(signInStudent);
router.route("/auth/student/signOut").get(requiresSigninStudent, studentSignOut);

// router.get("/auth/educator/isLoggedIn", requiresEducatorSignin, loggedInStatus);
// router.get("/auth/student/isLoggedIn", requiresStudentSignin, loggedInStatus);

module.exports = router;
