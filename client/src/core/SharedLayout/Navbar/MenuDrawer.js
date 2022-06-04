import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/Inbox";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
const MenuDrawer = (props) => {
  return (
    <Drawer
      anchor="left"
      open={props.anchorElNav}
      onClose={props.handleCloseNavMenu}
    >
      <Box
        sx={{
          width: 250,
        }}
        role="presentation"
      >
        <List>
            <ListItem button key={"Profile"}>
              <ListItemIcon>
                   <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
          <ListItem button key={"My Courses"}>
              <ListItemIcon>
                 <IntegrationInstructionsIcon />
              </ListItemIcon>
              <ListItemText primary={"MyCourses"} />
            </ListItem>
            <ListItem button key={"To-Do List"}>
              <ListItemIcon>
                 <AssignmentLateIcon />
              </ListItemIcon>
              <ListItemText primary={"To-Do List"} />
            </ListItem>
          
        </List>
      </Box>
    </Drawer>
  );
};

export default MenuDrawer;
