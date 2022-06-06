import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import classes from "./Courses.module.css";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses,setCourses]=useState([]);
  const host = "http://localhost:8000";
  const courseUpdate = (courses) => {
    console.log("State function called!");
    setCourses((prevunpublishedcourses) => {
      return courses;
    });
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
          {courses.map((course) => (
            <p>{course.name}</p>
          ))}
      </Box>
    </>
  );
};

export default Courses;
