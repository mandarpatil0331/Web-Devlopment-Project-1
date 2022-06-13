import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  CardMedia,
  Card,
  CardContent,
  TextField,
  Button
} from "@mui/material";
import { useParams } from "react-router-dom";

const CourseEnrollment = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [lesson, setLesson] = React.useState({});
  const params = useParams();
  const host = "http://localhost:8000";
  const lessonUpdate = (lesson) => {
    console.log("State function called!");
    setLesson((prevenroll) => {
      return lesson;
    });
  };
  const getLesson = async (lessonId) => {
    try {
      let response = await fetch(
        `${host}/api/enrollment/${params.EnrollmentId}/lessons/${lessonId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const svrres = await response.json();
      console.log(svrres.data.lesson);
      lessonUpdate(svrres.data.lesson);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLesson(params.LessonId);
  }, [params.LessonId]);
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        ml: "2%",
      }}
    >
      <video
        width="800"
        height="600"
        controls="controls"
        autoplay="true"
      />
      <Box>
        <Card sx={{height:"50%"}}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {lesson.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {lesson.description}
            </Typography>
          </CardContent>
        </Card>
        <Box>
          <Typography variant="h5" component="h2">
            Take A Note
          </Typography>
          <Box>
          <TextField fullWidth label="fullWidth" id="fullWidth" />
          <Button>Save</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CourseEnrollment;
