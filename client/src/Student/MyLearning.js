import React, { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Box } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Pagination,
} from "@mui/material";

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
      let response = await fetch(`${host}/api/courses/${User._id}?LIMIT:6&sort_select=${sort}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const svrres = await response.json();
      console.log(svrres.data.enrollments);
      myEnrollmentsUpdate(svrres.data.enrollments);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMyCourses();
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
      <Box>
        {myEnrollments.map((enrollment) => (
          <h1 key={enrollment.course._id}>{enrollment.course.name}</h1>
        ))}
      </Box>
    </>
  );
};

export default MyLearning;
