import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import SignIn from "./authStudent/SignIn";
import SharedLayout from "./core/SharedLayout/SharedLayout";
import SignUp from "./authStudent/SignUp";
import EducatorHome from "./core/EducatorHome";
import SignUpEducator from "./authEducator/SignUpEducator";
import SignInEducator from "./authEducator/SignInEducator";
import InstructorNavbar from "./core/SharedLayoutInstructor/InstructorNavbar/InstructorNavbar";
import InstructorVerticalList from "./core/SharedLayoutInstructor/InstructorVerticalList/InstructorVerticalList";
import Footer from "./core/SharedLayout/Footer";
import InstructorCourseHomePage from "./Instructor/InstructorCourseHomePage";
import InstructorUnpublishedCourses from "./Instructor/InstructorUnpublishedCourses";
import InstructorPublishedCourses from "./Instructor/InstructorPublishedCourses";
import InstructorMessages from "./Instructor/InstructorMessages";
import InstructorPerformance from "./Instructor/InstructorPerformance";
import InstructorReviewsAndRatings from "./Instructor/InstructorReviewsAndRatings";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Educator" element={<EducatorHome/>} />
        <Route path="/Educator/SignIn" element={<SignInEducator/>}/>
        <Route path="/Educator/SignUp" element={<SignUpEducator/>} />
      </Route>
      <Route path="/Instructor/:insturctorId" element={<><InstructorNavbar/><InstructorVerticalList/><Footer/></>}>
        <Route index element = {<InstructorCourseHomePage/>}/>
        <Route path="UnPublished" element={<InstructorUnpublishedCourses/>} />
        <Route path="Published" element={<InstructorPublishedCourses/>} />
        <Route path="Messages" element={<InstructorMessages/>} />
        <Route path="Performance" element={<InstructorPerformance/>} />
        <Route path="ReviewsAndRatings" element={<InstructorReviewsAndRatings/>} />
      </Route>
    </Routes>
  );
};
export default MainRouter;
