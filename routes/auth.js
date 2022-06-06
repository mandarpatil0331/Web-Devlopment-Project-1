const express = require("express");
const { signInEducator,requiresSigninEducator,educatorSignOut,signInStudent,requiresSigninStudent,studentSignOut,loggedInStatus } = require("../controllers/auth");



const router = express.Router();

router.route("/auth/educator/signin").post(signInEducator);
router.route("/auth/educator/signOut").get(requiresSigninEducator, educatorSignOut);
router.route("/auth/student/signin").post(signInStudent);
router.route("/auth/student/signOut").get(requiresSigninStudent, studentSignOut);

router.get("/auth/educator/isLoggedIn", requiresSigninEducator, loggedInStatus);
router.get("/auth/student/isLoggedIn", requiresSigninStudent, loggedInStatus);

module.exports = router;
