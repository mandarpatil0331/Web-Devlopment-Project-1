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
import EditCourse from "./course/EditCourse/EditCourse";
import MyLearning from "./Student/MyLearning/MyLearning";
import MyProfile from "./Student/MyProfile";
import MyPublicProfile from "./Student/MyPublicProfile";
import MyPhoto from "./Student/MyPhoto";
import MyAccount from "./Student/MyAccount";
import MyNotifications from "./Student/MyNotifications";
import CloseAccount from "./Student/CloseAccount";
import InstructorAssignments from "./Instructor/InstructorAssignments";
import InstructorPublicProfile from "./Instructor/InstructorPublicProfile";
import PublicSpecificCourse from "./course/SpecificCourse/PublicSpecificCourse";
import CourseEnrollment from "./Student/AfterEnrollment/CourseEnrollment";
import CourseDetails from "./Student/AfterEnrollment/CourseDetails";
import CourseVerticalList from "./Student/AfterEnrollment/CourseVerticalList";
import Basics from "./course/EditCourse/Basics";
import GoalsAndDescription from "./course/EditCourse/GoalsAndDescription";
import Curriculum from "./course/EditCourse/Curriculum/Curriculum";
import PricingAndPublish from "./course/EditCourse/PricingAndPublish";


const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Educator" element={<EducatorHome />} />
        <Route path="/Educator/SignIn" element={<SignInEducator />} />
        <Route path="/Educator/SignUp" element={<SignUpEducator />} />
        <Route path="/Course/:CourseId" element={<PublicSpecificCourse />} />
      </Route>
      <Route path="/Student/:StudentId" element={<SharedLayout/>}>
        <Route index element={<MyLearning />} />
        <Route path=":EnrollmentId" element={<CourseVerticalList />}>
          <Route index element={<CourseDetails />} />
          <Route path=":LessonId" element={<CourseEnrollment />} />
        </Route>
        <Route path="Profile" element={<MyProfile />}>
          <Route path="PublicProfile" element={<MyPublicProfile />} />
          <Route path="Photo" element={<MyPhoto />} />
          <Route path="Account" element={<MyAccount />} />
          <Route path="Notifications" element={<MyNotifications />} />
          <Route path="CloseAccount" element={<CloseAccount />} />
        </Route>
      </Route>
      <Route
        path="/Instructor/:InstructorId"
        element={<InstructorPublicProfile />}
      />
      <Route
        path="/Instructor"
        element={
          <>
            <InstructorNavbar />
            <InstructorVerticalList />
            <Footer />
          </>
        }
      >
        <Route index element={<InstructorCourseHomePage />} />
        <Route path="UnPublished" element={<InstructorUnpublishedCourses />} />
        <Route path="Published" element={<InstructorPublishedCourses />} />
        <Route path="Messages" element={<InstructorMessages />} />
        <Route path="Assignments" element={<InstructorAssignments />} />
        <Route path="Performance" element={<InstructorPerformance />} />
        <Route
          path="ReviewsAndRatings"
          element={<InstructorReviewsAndRatings />}
        />
      </Route>
      <Route path="/Course/:CourseId/Edit" element={<><InstructorNavbar /><EditCourse /></>} >
        <Route path="Basics" element={<Basics/>} />
        <Route path="GoalsAndDescription" element={<GoalsAndDescription/>} />
        <Route path="Curriculum" element={<Curriculum/>} />
        <Route path="PricingAndPublish" element={<PricingAndPublish/>} />
      </Route>
    </Routes>
  );
};
export default MainRouter;
