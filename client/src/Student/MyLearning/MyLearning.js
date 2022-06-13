import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Box } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  LinearProgress,
  Grid,
  Stack,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";

import MyLearningCards from "./MyLearningCards";
import MyLearningSortBox from "./MyLearningSortBox";

const MyLearning = () => {
  const [sort, setSort] = React.useState("");
  const { User } = useContext(AuthContext);
  const host = "http://localhost:8000";
  const [myEnrollments, setMyEnrollments] = React.useState([]);
  const myEnrollmentsUpdate = (enrollments) => {
    console.log("State function called!");
    setMyEnrollments((prevenroll) => {
      return enrollments;
    });
  };
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const getMyCourses = async () => {
    try {
      let response = await fetch(
        `${host}/api/${User._id}/enrollments?LIMIT=8&sort_select=${sort}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const svrres = await response.json();
      console.log(svrres.data.enrollments);
      myEnrollmentsUpdate(svrres.data.enrollments);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMyCourses();
  }, [User,sort]);
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 3,
          justifyContent: "space-around",
          mb: 4,
        }}
      >
        <Box>
          <h2>Your Courses</h2>
        </Box>
        <Box sx={{ minWidth: 180 }}>
          <MyLearningSortBox sort={sort} handleChange={handleChange}/>
        </Box>
      </Box>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="space-around"
        >
          <Grid item xs={5}>
            {myEnrollments.slice(0, 4).map((enrollment) => (
              <Link to={`/Student/${User._id}/${enrollment._id}`}>
              <MyLearningCards enrollment={enrollment} key={enrollment.course._id} imageWidth={180}/>
              </Link>
            ))}
          </Grid>
          <Grid item xs={5}>
            {myEnrollments.slice(4, 8).map((enrollment) => (
              <Link to={`/Student/${User._id}/${enrollment._id}`}>
              <MyLearningCards enrollment={enrollment} key={enrollment.course._id} imageWidth={180}/>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MyLearning;
