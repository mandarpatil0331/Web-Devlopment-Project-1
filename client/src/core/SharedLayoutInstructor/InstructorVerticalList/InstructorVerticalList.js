import React,{useContext, useEffect} from "react";
import { Box,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Collapse} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Link, Outlet,useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const InstructorVerticalList = () => {
  const {User}=useContext(AuthContext);
  const params=useParams();
  useEffect(() => {
    console.log(User);
  } ,[User])
  const [openCourses, setOpenCourses] = React.useState(true);

  const handleClickCourses = () => {
    setOpenCourses(!openCourses);
  };
  const [open, setOpen] = React.useState({
    course: false,
    communication: false,
    tools: false,
    others: false,
    profile: false,
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
  const handleClickProfile = (e) => {
    setOpen({ ...open, profile: !open.profile });
  };

  const userPresent=(<Box component="div" sx={{ display: "flex",flexDirection:"row"}} >
  <Box sx={{flexGrow:1}}>
    <List
      sx={{ width: "100%", bgcolor: "background.paper"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link to={`/Instructor`} style={{ textDecoration: "none",color:"inherit" }}>
      <ListItem>
        <ListItemButton onClick={handleClickCourse}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
          {open.course ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      </Link>
      <Collapse in={open.course} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={`/Instructor/UnPublished`} style={{ textDecoration: "none",color:"inherit" }}>
          <ListItem>
            <ListItemButton sx={{ pl: 4}}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Unpublished" />
            </ListItemButton>
          </ListItem>
          </Link>
          <Link to={`/Instructor/Published`} style={{ textDecoration: "none",color:"inherit" }}>
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
        <Link to={`/Instructor/Messages`} style={{ textDecoration: "none",color:"inherit" }}>
          <ListItem>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
          </Link>
          <Link to={`/Instructor/Assignments`} style={{ textDecoration: "none",color:"inherit" }}>
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
          <Link to={`/Instructor/Performance`} style={{ textDecoration: "none",color:"inherit" }}>
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
        <ListItemButton onClick={handleClickProfile}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
          {open.profile ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open.profile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={`/Instructor/PublicProfile`} style={{ textDecoration: "none",color:"inherit" }}>
          <ListItem>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Public Profile" />
            </ListItemButton>
          </ListItem>
          </Link>
          <Link to={`/Instructor/Photo`} style={{ textDecoration: "none",color:"inherit" }}>
          <ListItem>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Photo" />
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
</Box>)

  return (
    User && userPresent
  );
};

export default InstructorVerticalList;
