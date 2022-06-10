import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";

const VerticalListSection = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickCourse = () => {
    setOpen(!open);
  };
  return (
    <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
      <ListItem button onClick={handleClickCourse} key={props.section._id}>
        <ListItemText primary={props.section.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {props.section.lessons.map((lesson) => {
              return (
                  <Link to={`/Student/${props.StudentId}/${props.EnrollmentId}/${lesson._id}`} key={lesson._id}>
                <ListItem button >
                  <ListItemText primary={lesson.name} />
                </ListItem>
                </Link>
              );
            })}
          </List>
        </Collapse>
    </Box>
  );
};

export default VerticalListSection;
