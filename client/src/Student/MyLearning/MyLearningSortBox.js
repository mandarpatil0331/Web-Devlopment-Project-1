import React from 'react'
import { FormControl,InputLabel,MenuItem,Select } from '@mui/material'

const MyLearningSortBox = (props) => {
  return (
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
      <MenuItem value="updatedAt">Latest</MenuItem>
    </Select>
  </FormControl>
  )
}

export default MyLearningSortBox