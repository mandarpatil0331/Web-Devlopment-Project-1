import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Card,
  CardMedia,
  Rating,
  CardContent,
  Typography,
  CardActions,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Section from "./Section";

const PublicSpecificCourse = () => {
  const [course, setCourse] = useState({});
  const [sectionsDisplay, setSectionsDisplay] = useState(7);
  const [view,setView] = useState("More");
  let params = useParams();
  const host = "http://localhost:8000";
  const updateCourse = (editCourse) => {
    setCourse((prevCourse) => {
      console.log(editCourse);
      return editCourse;
    });
  };
  const displayMore=()=>{
    setSectionsDisplay(course.sections.length);
    setView("Less");
  };
  const displayLess=()=>{
    setSectionsDisplay(7);
    setView("More");
  };
  const getCourse = async () => {
    try {
      let response = await fetch(`${host}/api/courses/${params.CourseId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const svrres = await response.json();
      console.log(svrres.data.course[0].instructor.name);
      updateCourse(svrres.data.course[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCourse();
  }, [params.courseId]);

  return (
    course &&
    course.instructor && (
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-evenly", mt: 5, mr: 2 }}
      >
        <Grid item xs={7}>
          <Box sx={{ mb: 5 }}>
            <Box sx={{ mb: 0.5 }}>
              <Typography variant="h3" align="left">
                {course.name}
              </Typography>
            </Box>
            <Box sx={{ mb: 0.1 }}>
              <Typography variant="h5" align="left">
                {course.objective}
              </Typography>
            </Box>
            <Box
              sx={{ mb: 0.25 }}
              display="flex"
              alignItems="center"
              flexDirection="row"
              justifyContent="flex-start"
            >
              {course.Ratings}
              <Rating
                name="ratings"
                value={course.Ratings}
                sx={{ paddingLeft: 2, paddingRight: 2 }}
                readOnly
              />
              <Typography>{course.totalEnrollments}</Typography>
            </Box>
            <Box sx={{ mb: 0.2 }}>{course.instructor.name}</Box>
            <Box sx={{ mb: 0.5 }}>{course.updatedAt}</Box>
          </Box>
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography>What You'LL Learn</Typography>
              <Box sx={{padding:2}} >
                {course.courseGoals && course.courseGoals.map((goal,index)=>{
                  return (
                    <Box sx={{padding:2}} key={index}>
                      {goal}
                    </Box>
                  )
                })}
              </Box>
            </Box>
            <Box>
              <List>
                {course.sections &&
                  course.sections.slice(0,sectionsDisplay).map((section, index) => {
                    return (
                      <Section section={section} params={params} key={section._id} />
                    );
                  })}
                  {course.sections && course.sections.length > 7 && (
                    <ListItem sx={{display:"flex",justifyContent:"center",alignItems:"center"}} key="MoreorLessButton">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={view==="less"?displayLess:displayMore}
                      >
                        View {view}
                      </Button>
                    </ListItem>
                  )}
              </List>
            </Box>
            <Box>{course.description}</Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardMedia
              component="img"
              height="120"
              image="https://ychef.files.bbci.co.uk/1600x900/p09f3lcg.webp"
              alt="course image"
            />
            <CardContent>
              <Typography variant="h3">₹{course.price}</Typography>
            </CardContent>
            <CardActions sx={{display:"flex",justifyContent:"space-around"}}>
              <Button size="large">Add To Cart</Button>
              <Button size="large">Buy Now</Button>
            </CardActions>
            <CardContent>
              <Typography>This Course Includes</Typography>
              <List>
                <ListItem>1 Course Item</ListItem>
                <ListItem>2 Course Item</ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  );
};

export default PublicSpecificCourse;
