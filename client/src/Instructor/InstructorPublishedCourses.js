import React, { useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import AuthContext from "../context/AuthContext";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const InstructorPublishedCourses = () => {
  const { User } = useContext(AuthContext);
  const [publishedCourses, setPublishedCourses] = React.useState([]);
  const host = "http://localhost:8000";
  const courseUpdate = (courses) => {
    console.log("State function called!");
    setPublishedCourses((prevunpublishedcourses) => {
      return courses;
    });
  };
  const getPublishedCourses = async () => {
    try {
      let response = await fetch(`${host}/api/courses/${User._id}/published`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const svrres = await response.json();
      console.log(svrres.data.courses);
      courseUpdate(svrres.data.courses);
    } catch (err) {
      console.log(err);
    }
  };
  const unPublishCourse = async (courseId) => {
    try {
      let response = await fetch(
        `${host}/api/courses/${User._id}/published/${courseId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const svrres = await response.json();
      console.log(svrres.data.course);
      courseUpdate(publishedCourses.filter((course)=>{return course._id!==courseId}));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPublishedCourses();
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} width="100">
      {publishedCourses.map((course) => (
        <Box
          key={course._id}
          display="flex"
          height="40"
          sx={{ borderColor: "primary.secondary", mt: 3, mb: 2, ml: 5, mr: 10 }}
        >
          <Box sx={{ flexGrow: "1" }} display="block">
            <Typography sx={{ mt: 1, mb: 1 }}>{course.name}</Typography>
            <br />
            <Typography sx={{ mb: 1 }}>{course.description}</Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
              <Button>
                Reviews & Ratings
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                onClick={() => {
                  unPublishCourse(course._id)
                }}
              >
                Unpublish
              </Button>
            </Box>

        </Box>
      ))}
    </Box>
  );
};

export default InstructorPublishedCourses;
