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
  Pagination,
  Stack,

} from "@mui/material";
import {FormControl,InputLabel,Select,MenuItem,Stack,Pagination} from "@mui/material"
import AuthContext from "../context/AuthContext";
import { styled } from "@mui/material/styles";
import {Link} from "react-router-dom"

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const InstructorUnpublishedCourses = () => {
  const [pageNumber, setPageNumber] = React.useState(1);
  const[numberOfPages,setNumberOfPages] = React.useState(0);
  const { User } = useContext(AuthContext);
  const [unpublishedCourses, setUnpublishedCourses] = React.useState([]);
  const [numberOfPages,setNumberOfPages] = React.useState(0);
  const [pageNumber,setPageNumber]  = React.useState(1);
  const host = "http://localhost:8000";
  const courseUpdate = (courses) => {
    console.log("State function called!");
    setUnpublishedCourses((prevunpublishedcourses) => {
      return courses;
    });
  };
  const [sort, setSort] = React.useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const handlePaginationChange = (event,page) => {
    console.log(page)
    setPageNumber(page);
  }
  const getUnpublishedCourses = async () => {
    try {
      let response = await fetch(
        `${host}/api/courses/${User._id}/unpublished?sort_select=${sort}&page=${pageNumber}`,
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
      console.log(svrres.data.courses);
      courseUpdate(svrres.data.courses);
      setNumberOfPages(svrres.numberOfPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUnpublishedCourses();
      }, [sort,pageNumber]);
  return (<>
  <Box component="div" sx={{ display: "flex",flexDirection:"row",mt:3,justifyContent:"space-around"}}>
      <Box><h2>Your Unpublished Courses</h2></Box>
      <Box sx={{ minWidth: 180}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value="updatedAt">Recent</MenuItem>
          <MenuItem value="name">Alphabetically</MenuItem>
          <MenuItem value="createdAt">Date Added</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column" }} width="100" height="200">
      {unpublishedCourses.map((course) => (
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
          <Box>
            <BorderLinearProgress variant="determinate" value={50} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Link to={`/Course/${course._id}/edit/`}>
              <Button>Edit</Button>
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column" ,justifyContent:"center" ,alignItems:"center",position:"relative"}} width="100" >
    <Stack spacing={2} >
      <Pagination count={numberOfPages} onChange={handlePaginationChange} shape="rounded" />
    </Stack>
    </Box>
    </>
  );
 };
export default InstructorUnpublishedCourses;
