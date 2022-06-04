import React from 'react'
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import classes from "./Courses.module.css";

const MyCourses = () => {
  const course = {};
  return (
    <>
    <Card className={classes["course-card"]} key={course._id}>
              <CardMedia
                component="img"
                height="120"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="course image"
              />
              <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1 }}
                    align="center"
                    className={classes["course-card-nametypo"]}
                  >
                    course.name
                  </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 0.2 }}
                  align="center"
                  color="text.secondary"
                >
                  course.description
                </Typography>
                  <Typography variant="body5" align="left">
                    course.instructor.name
                  </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
    </>
  )
}

export default MyCourses