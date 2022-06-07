import React,{useState} from 'react';
import { ListItem,ListItemButton,ListItemText,Collapse,Card,CardMedia,CardContent,Typography } from '@mui/material';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function Lesson(props) { 
    const host = "http://localhost:8000";
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
      };
    
  return (
      <>
    <ListItem>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={`${props.lesson.title}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
    <Card>
      <CardMedia
        component="img"
        src={`${host}/api/courses/image/${props.params.courseId}`}
        alt="lesson video"
      />
      <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }} align="center">
            {props.lesson.content}
          </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 0.2 }}
          align="center"
          color="text.secondary"
        >
          {props.lesson.resource_url}
        </Typography>
      </CardContent>
    </Card>
  </Collapse>
  </>
  )
}

export default Lesson