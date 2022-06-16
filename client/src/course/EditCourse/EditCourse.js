import React from 'react'
import { Box,List,ListItem,ListItemIcon,ListItemText,ListItemButton } from '@mui/material'
import { Outlet,Link,useParams } from 'react-router-dom'

const EditCourse = () => {
  const params=useParams();
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-around">
        <Box sx={{width: '100%', maxWidth: 300}}>
        <nav aria-label="main mailbox folders">
        <List>
        <Link to={`/Course/${params.CourseId}/Edit/Basics`} style={{ textDecoration: "none",color:"inherit" }}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>

              </ListItemIcon>
              <ListItemText primary="Basics" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/Course/${params.CourseId}/Edit/GoaLsAndDescription`} style={{ textDecoration: "none",color:"inherit" }}>
          <ListItem >
            <ListItemButton>
              <ListItemIcon>

              </ListItemIcon>
              <ListItemText primary="Goals and Description" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/Course/${params.CourseId}/Edit/Curriculum`} style={{ textDecoration: "none",color:"inherit" }}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Curriculum" />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* <Link to={`/Course/${params.CourseId}/Edit/Assignments`} style={{ textDecoration: "none",color:"inherit" }}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Assignments" />
            </ListItemButton>
          </ListItem>
        </Link> */}
        <Link to={`/Course/${params.CourseId}/Edit/PricingAndPublish`} style={{ textDecoration: "none",color:"inherit" }}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Pricing And Publish" />
            </ListItemButton>
          </ListItem>
        </Link>
        </List>
      </nav>
        </Box>
        <Box sx={{flexGrow:1}}>
            <Outlet/>
        </Box>
    </Box>
  )
}

export default EditCourse