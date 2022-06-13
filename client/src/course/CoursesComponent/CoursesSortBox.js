import React from 'react'
import {Box,FormControl,InputLabel,Select,MenuItem} from '@mui/material'


const CoursesSortBox = (props) => {
  return (
    <Box sx={{ minWidth: 180 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.sort}
              label="Sort"
              onChange={props.handleChange}
            >
              <MenuItem value="-enrollments">Most Popular</MenuItem>
              <MenuItem value="name">Alphabetically</MenuItem>
              <MenuItem value="createdAt">Latest</MenuItem>
            </Select>
          </FormControl>
        </Box>
  )
}

export default CoursesSortBox