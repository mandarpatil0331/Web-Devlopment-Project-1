import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia
} from "@mui/material";
import Lesson from "./Lesson";

const Section = ({ section,index,updateLesson }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
        <IconButton>
            {index+1}
        </IconButton>
      <Typography gutterBottom variant="h5" component="div">
        {section.name}
      </Typography>
      <List>
      {section.lessons.map((lesson) => (
          <Lesson lesson={lesson} key={lesson._id} updateLesson={updateLesson} />
        ))}
        </List>
    </CardContent>
    <CardActions>
      <Button size="small">Add A Lesson</Button>
    </CardActions>
  </Card>
  );
};

export default Section;
