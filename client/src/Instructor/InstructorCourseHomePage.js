import React from 'react'
import {Box,FormControl,InputLabel,Select,MenuItem,Typography} from "@mui/material"
import SearchBar from "../core/SharedLayoutInstructor/InstructorNavbar/SearchBar"

const InstructorCourseHomePage = () => {
  const [sort, setSort] = React.useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <>
    <Box component="div" sx={{ display: "flex",flexDirection:"row",mt:3,justifyContent:"space-around"}}>
      <SearchBar/>
      <Box sx={{ minWidth: 160}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value="Most Popular">Most Popular</MenuItem>
          <MenuItem value="Most Recent">Recent</MenuItem>
          <MenuItem value="Alphbetical">Alphabetically</MenuItem>
          <MenuItem value="Date Added">Date Added</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </Box>
    <Box>
      <p>Your Courses</p>
      {/* {Courses.map((course) => (
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

        </Box>
      ))} */}
    </Box>
    </>
  )
}

export default InstructorCourseHomePage