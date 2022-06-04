import React from "react";
import { Box } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Link, Outlet } from "react-router-dom";
const InstructorVerticalList = () => {
  const [openCourses, setOpenCourses] = React.useState(true);

  const handleClickCourses = () => {
    setOpenCourses(!openCourses);
  };
  const [open, setOpen] = React.useState({
    course: false,
    communication: false,
    tools: false,
    others: false,
  });
  const handleClickCourse = (e) => {
    setOpen({ ...open, course: !open.course });
  };
  const handleClickCommunication = (e) => {
    setOpen({ ...open, communication: !open.communication });
  };
  const handleClickTools = (e) => {
    setOpen({ ...open, tools: !open.tools });
  };
  const handleClickOthers = (e) => {
    setOpen({ ...open, others: !open.others });
  };

  return (
    <Box component="div" sx={{ display: "flex",flexDirection:"row"}} >
      <Box sx={{flexGrow:1}}>
        <List
          sx={{ width: "100%", bgcolor: "background.paper"}}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItem>
            <ListItemButton onClick={handleClickCourse}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
              {open.course ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={open.course} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/Instructor/UnPublished" style={{ textDecoration: "none",color:"inherit" }}>
              <ListItem>
                <ListItemButton sx={{ pl: 4}}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Unpublished" />
                </ListItemButton>
              </ListItem>
              </Link>
              <Link to="/Instructor/Published" style={{ textDecoration: "none",color:"inherit" }}>
              <ListItem>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Published" />
                </ListItemButton>
              </ListItem>
              </Link>
            </List>
          </Collapse>
          <ListItem>
            <ListItemButton onClick={handleClickCommunication}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Communication" />
              {open.communication ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={open.communication} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <Link to="/Instructor/Messages" style={{ textDecoration: "none",color:"inherit" }}>
              <ListItem>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Messages" />
                </ListItemButton>
              </ListItem>
              </Link>
              <Link to="/Instructor/Assignments" style={{ textDecoration: "none",color:"inherit" }}>
              <ListItem>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Assignments" />
                </ListItemButton>
              </ListItem>
              </Link>
            </List>
          </Collapse>
          <ListItem>
            <ListItemButton onClick={handleClickTools}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Tools" />
              {open.tools ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={open.tools} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/Instructor/Performance" style={{ textDecoration: "none",color:"inherit" }}>
              <ListItem>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Performance" />
                </ListItemButton>
              </ListItem>
              </Link>
            </List>
          </Collapse>
          <ListItem>
            <ListItemButton onClick={handleClickOthers}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="other" />
              {open.others ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={open.others} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <Link to="/Instructor/UnPublished" style={{ textDecoration: "none",color:"inherit" }}>
              <ListItem>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Reviews and rating" />
                </ListItemButton>
              </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </Box>
      <Box sx={{flexGrow:10}}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default InstructorVerticalList;
