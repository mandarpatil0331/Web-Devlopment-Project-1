import {
  TextField,
  Box,
  Typography,
  Button,
  ListItem,
  IconButton,
  List,Grid
} from "@mui/material";
import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Section from "./Section";

const Curriculum = () => {
  const params = useParams();
  const { User } = useContext(AuthContext);
  const host = "http://localhost:8000";
  const [sectionDetails, setSectionDetails] = React.useState([]);
  const updateFetchSectionDetails = (details) => {
    setSectionDetails((prevCourse) => {
      console.log(details);
      return details;
    });
  };
  const updateLesson = (lesson) => {
    
    console.log(lesson);
  }
  const uploadVideo = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("classroom2", e.target.files[0]);
    const response = await fetch(`${host}/api/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${User.token}`,
      },
    });
    const data = await response.json();
    console.log(data);
  };
  const getCourse = async () => {
    console.log(User);
    try {
      let response = await fetch(
        `${host}/api/courses/${User._id}/unpublished/${params.CourseId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const svrres = await response.json();
      console.log(svrres.data.course[0].sections);
      updateFetchSectionDetails(svrres.data.course[0].sections);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCourse();
  }, [User]);
  return (
    sectionDetails && (
      <>
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          sx={{ mt: "2%", mb: "3%" }}
        >
          <Typography align="center" variant="h3">
            Cirriculum
          </Typography>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {sectionDetails.map((section,index) => (
            <Grid item xs={2} sm={4} md={4} key={section._id}>
              <Section section={section} index={index} updateLesson={updateLesson}/>
            </Grid>
          ))}
        </Grid>
      </>
    )
  );
};

export default Curriculum;
