import React, { useEffect, useState, useContext } from "react";
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
import AuthContext from "../context/AuthContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Courses = () => {
  const { User } = useContext(AuthContext);
  const [sort, setSort] = React.useState("");
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openCourseDetail = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeCourseDetail = () => {
    setAnchorEl(null);
  };

  const openDetail = Boolean(anchorEl);
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
        <IconButton disabled={pageNumber === 1} onClick={decreasePageNumber}>
          <ArrowBackIosIcon />
        </IconButton>
        {courses.map((course) => (
          <Card
            className={classes["course-card"]}
            key={course._id}
            onMouseEnter={openCourseDetail}
            onMouseLeave={closeCourseDetail}
          >
            <CardMedia
              component="img"
              height="120"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="course image"
            />
            <CardContent>
              <Link to={"/Course/" + course._id} className={classes.link}>
                <Typography
                  variant="h6"
                  sx={{ mb: 1 }}
                  align="center"
                  className={classes["course-card-nametypo"]}
                >
                  {course.name}
                </Typography>
              </Link>
              <Link
                to={"/Instructor/" + course.instructor._id}
                className={classes.link}
              >
                <Typography variant="body5" align="left">
                  {course.instructor.name}
                </Typography>
              </Link>
              <Stack>
                <Rating
                  name="course-rating"
                  size="small"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" align="left">
                  {course.rating}
                </Typography>
              </Stack>
              <Typography>₹{course.price}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>

            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={openDetail}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
              onClose={closeCourseDetail}
              disableRestoreFocus
            >
              <Box>
                <Typography>{course.name}</Typography>
              </Box>
            </Popover>
          </Card>
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
