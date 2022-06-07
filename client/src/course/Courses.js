import React, { useEffect, useState ,useContext} from "react";
// import useTheme from '@mui/material/styles';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,

  Box
} from "@mui/material";
import classes from "./Courses.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// const theme = useTheme();
const Courses = () => {
  const [courses,setCourses]=useState([]);
  const { User } = useContext(AuthContext);
  const [publishedCourses, setPublishedCourses] = React.useState([]);
  const [numberOfPages,setNumberOfPages] = React.useState(0);
  const [pageNumber,setPageNumber]  = React.useState(1);
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
  const getCourses = async () => {
    try {
      let response = await fetch(`${host}/api/courses`, {
        method: "GET",
        headers: {
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
  useEffect(()=>{
    getCourses();
  },[])
  return (
    <>
      <Typography align="center" sx={{ mb: 5 }} variant="h3">
        All Courses
      </Typography>
      <Box sx={{ height: 300 ,display:"flex",justifyContent:"space-around",alignItems:"center"}}>
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

              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="previous">
                  {/* <SkipNextIcon /> : <SkipPreviousIcon /> */}
                </IconButton>
                <IconButton aria-label="play/pause">
                  {/* <PlayArrowIcon sx={{ height: 38, width: 38 }} /> */}
                </IconButton>
                <IconButton aria-label="next">
                  {/* <SkipPreviousIcon /> : <SkipNextIcon /> */}
                </IconButton>
              </Box>
            </Box>
          ))}

      </Box>
    </>
  );
};

export default Courses;
