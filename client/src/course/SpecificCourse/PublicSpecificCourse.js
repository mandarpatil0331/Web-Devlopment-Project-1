import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lesson from "./Lesson";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import classes from "./Course.module.css";
import List from "@mui/material/List";

const PublicSpecificCourse = () => {
  let params = useParams();
  const host = "http://localhost:8000";
  const [course, setCourse] = useState({ instructor: {} });
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Box className={classes["main-info-container"]}>
          <Card>
            <CardMedia
              className={classes["card-media"]}
              component="img"
              height="250"
              src={`${host}/api/courses/image/${params.courseId}`}
              alt="course image"
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{ mb: 1 }}
                align="center"
                className={classes["course-card-nametypo"]}
              >
                {course.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 0.2 }}
                align="center"
                color="text.secondary"
              >
                {course.category}
              </Typography>
              <Typography variant="h5" align="left">
                {course.price}$122
              </Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
              <Button className={classes.btn}>Add To Cart</Button>
              <Button className={classes.btn}>Buy Now</Button>
            </CardActions>
            <CardContent>
              <Typography
                variant="body2"
                sx={{ mb: 0.2 }}
                align="center"
                color="text.secondary"
              >
                {course.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box className={classes["lesson-info-container"]}>
          <Typography
            variant="h5"
            sx={{ mb: 0.2 }}
            align="left"
            color="text.secondary"
          >
            Course Content
          </Typography>
          <Typography variant="body2" align="left">
            sections .
          </Typography>
          <List>
            {course.lessons &&
              course.lessons.map((lesson, index) => {
                return <Lesson lesson={lesson} params={params} />;
              })}
          </List>
        </Box>
      </Grid>
    </>
  );
};

export default PublicSpecificCourse;
