import React,{useState} from 'react';
import { ListItem,ListItemButton,ListItemText,Collapse,Box,Card,CardMedia,CardContent,Typography, listItemSecondaryActionClasses } from '@mui/material';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function Section(props) { 
    const host = "http://localhost:8000";
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
      };
    
  return (
      <>
    <ListItem>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={`${props.section.name}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit >
      {props.section.lessons.map((lesson,index) => (
        <Box padding={2} paddingLeft={4} display="flex" flexDirection="row">
          <Typography mr={2}>
            {index}
          </Typography>
          <Typography>
            {lesson.name}
          </Typography>
        </Box>
      ))}
  </Collapse>
  </>
  )
}

export default Section;