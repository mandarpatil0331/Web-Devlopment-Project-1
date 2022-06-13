import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Box,
  Rating,
  Popover,
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
import AuthContext from "../../context/AuthContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CoursesSortBox from "./CoursesSortBox";
import CoursesCard from "./CoursesCard";

const Courses = () => {
  const { User } = useContext(AuthContext);
  const [sort, setSort] = React.useState("");
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const [courses, setCourses] = useState([]);
  const host = "http://localhost:8000";
  const courseUpdate = (courses) => {
    console.log("State function called!");
    setCourses((prevcourses) => {
      return courses;
    });
  };
  const increasePageNumber = () => {
    setPageNumber((prevpageNumber) => {
      return prevpageNumber + 1;
    });
  };
  const decreasePageNumber = () => {
    setPageNumber((prevpageNumber) => {
      return prevpageNumber - 1;
    });
  };
  const getCourses = async () => {
    try {
      let response = await fetch(
        `${host}/api/courses?sort_select=${sort}&page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const svrres = await response.json();
      console.log(svrres.data.courses);
      courseUpdate(svrres.data.courses);
      setNumberOfPages(svrres.numberOfPages);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCourses();
  }, [sort, pageNumber]);
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
        <CoursesSortBox sort={sort} handleChange={handleChange} />
      </Box>
      <Box
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <IconButton disabled={pageNumber === 1} onClick={decreasePageNumber}>
          <ArrowBackIosIcon />
        </IconButton>
        {courses.map((course) => (
          <CoursesCard course={course} key={course._id} />
        ))}
        <IconButton
          disabled={pageNumber === numberOfPages}
          onClick={increasePageNumber}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default Courses;
