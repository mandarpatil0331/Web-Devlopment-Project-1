import React from 'react'
import {Box,Typography,Container,Button,Stack,Pagination} from "@mui/material"
import { Link } from 'react-router-dom'


const EducatorLinkBlock = () => {
  return (
    <Box display="flex" sx={{ mt: 5 }} flexDirection="column">
    <Typography align="center" sx={{ mb: 3 }} variant="h3">
      Become instructor
    </Typography>
    
    <Box display="flex" sx={{ mb: 3 }} flexDirection="row" justifyContent="center" alignItems="center">
    <Link to="/Educator/SignUp" style={{ color: "inherit", textDecoration: "inherit" }}>
      <Button sx={{mr:3}}>Educators SignUp</Button>
    </Link>
    <Link to="/Educator/SignIn" style={{ color: "inherit", textDecoration: "inherit" }}>
      <Button >Educators Login</Button>
    </Link>
    </Box>
  </Box>
  )
}

export default EducatorLinkBlock