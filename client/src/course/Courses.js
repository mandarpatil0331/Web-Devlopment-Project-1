import React, { useEffect, useState,useContext } from "react";
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
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Pagination,
} from "@mui/material";
import classes from "./Courses.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Courses = () => {
  const {User} = useContext(AuthContext);
  const [sort, setSort] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const [courses, setCourses] = useState([]);
  const host = "http://localhost:8000";
  const courseUpdate = (courses) => {
    console.log("State function called!");
    setCourses((prevunpublishedcourses) => {
      return courses;
    });
  };
  const getCourses = async () => {
    try {
      let response = await fetch(`${host}/api/courses?sort_select=${sort}`, {
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
  useEffect(() => {
    getCourses();
  }, [sort]);
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 3,
          justifyContent: "space-around",
        }}
      >
        <Box>
          {User && <h2>Recommended Courses</h2>}
          {!User && <h2>All Courses</h2>}
        </Box>
        <Box sx={{ minWidth: 180 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Sort"
              onChange={handleChange}
            >
              <MenuItem value="-enrollments">Most Popular</MenuItem>
              <MenuItem value="name">Alphabetically</MenuItem>
              <MenuItem value="createdAt">Latest</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {courses.map((course) => (
          <p key={course._id}>{course.name}</p>
        ))}
      </Box>
    </>
  );
};

export default Courses;
