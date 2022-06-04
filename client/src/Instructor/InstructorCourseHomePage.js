import React from 'react'
import {Box,FormControl,InputLabel,Select,MenuItem} from "@mui/material"
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
      
    </Box>
    </>
  )
}

export default InstructorCourseHomePage