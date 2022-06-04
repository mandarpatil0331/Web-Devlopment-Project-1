import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import classes from "./Courses.module.css";
import { Link } from "react-router-dom";

const Courses = () => {
  const courses = [];
  return (
    <>
      <Typography align="center" sx={{ mb: 5 }} variant="h3">
        All Courses
      </Typography>
      <Box sx={{ height: 400, backgroundColor: "green" }}>
        <Grid className={classes["course-container"]}>
          {courses.map((course) => (
            <Card className={classes["course-card"]} key={course._id}>
              <CardMedia
                component="img"
                height="120"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="course image"
              />
              <CardContent>
                <Link to={"/courses/" + course._id} className={classes.link}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1 }}
                    align="center"
                    className={classes["course-card-nametypo"]}
                  >
                    course.name
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  sx={{ mb: 0.2 }}
                  align="center"
                  color="text.secondary"
                >
                  course.description
                </Typography>
                <Link
                  to={"/user/" + course.instructor._id}
                  className={classes.link}
                >
                  <Typography variant="body5" align="left">
                    course.instructor.name
                  </Typography>
                </Link>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Courses;
