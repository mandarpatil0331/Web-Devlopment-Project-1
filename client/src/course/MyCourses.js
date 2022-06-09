import React, { useEffect, useContext } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  LinearProgress,
  IconButton,
  Grid,GridItem
} from "@mui/material";
import classes from "./SpecificCourse/Course.module.css";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MyLearningCards from "../Student/MyLearning/MyLearningCards";

const MyCourses = () => {
  const { User } = useContext(AuthContext);
  const host = "http://localhost:8000";
  const [myEnrollments, setMyEnrollments] = React.useState([]);
  const myEnrollmentsUpdate = (enrollments) => {
    console.log("State function called!");
    setMyEnrollments((prevenroll) => {
      return enrollments;
    });
  };
  const getMyCourses = async () => {
    try {
      let response = await fetch(`${host}/api/${User._id}/enrollments?LIMIT=3&sort_select=-updatedAt`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const svrres = await response.json();
      console.log(svrres.data.enrollments);
      myEnrollmentsUpdate(svrres.data.enrollments);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMyCourses();
  }, []);
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="flex-end" sx={{ mr: 5, mt: 5 }}>
          <Link to={`Student/${User._id}`}>
            <Button>My learning</Button>
          </Link>
        </Box>
        <Box display="flex" justifyContent="space-around" alignItems="center">
          {myEnrollments.map((enrollment) => (
            <MyLearningCards enrollment={enrollment} key={enrollment.course._id} imageWidth={150} width={450}/>
          ))}
        </Box>
      </Box>
    </>
  );
};


export default MyCourses;
