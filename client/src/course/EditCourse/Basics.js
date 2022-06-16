import {
  TextField,
  Box,
  Typography,
  Button,
  ListItem,
  IconButton,
} from "@mui/material";
import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

const Basics = () => {
  const params = useParams();
  const host = "http://localhost:8000";
  const { User } = useContext(AuthContext);
  const [courseDetails, setCourseDetails] = React.useState({
    name: "",
    description: "",
    objective: "",
    goals: [""],
    requirements: [""],
  });
  const addGoal = () => {
    setCourseDetails({ ...courseDetails, goals: [...courseDetails.goals, ""] });
  };
  const onChangeGoals = (index) => (event) => {
    const newGoals = courseDetails.goals;
    newGoals[index] = event.target.value;
    setCourseDetails({ ...courseDetails, goals: newGoals });
  };
  const deleteGoal = (index) => (event) => {
    let newGoals = courseDetails.goals;
    newGoals = newGoals.filter((goal, i) => i !== index);
    setCourseDetails({ ...courseDetails, goals: newGoals });
  };
  const deleteRequirement=(index)=>(event)=>{
    let newRequirements=courseDetails.requirements;
    newRequirements=newRequirements.filter((requirement,i)=>i!==index);
    setCourseDetails({...courseDetails,requirements:newRequirements});
  }
  const addRequirement = () => {
    setCourseDetails({ ...courseDetails, requirements: [...courseDetails.requirements, ""] });
  }
  const onChangeRequirement = (index) => (event) => {
    const newRequirements = courseDetails.requirements;
    newRequirements[index] = event.target.value;
    setCourseDetails({ ...courseDetails, requirements: newRequirements });
  };
  const onChange = (e) => {
    console.log(e);
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };
 
  const updateDetails = (course) => {
    setCourseDetails((prevCourse) => {
      console.log(course);
      return {
        name: course.name,
        description: course.description || "",
        objective: course.objective,
        goals: course.courseGoals,
        requirements: course.requirements,
      };
    });
  };
  const updateDetailsBackend = async() => {
    try {
      let response = await fetch(
        `${host}/api/courses/${User._id}/unpublished/${params.CourseId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseDetails),
        },
      );
      const svrres = await response.json();
      console.log(svrres);
    } catch (err) {
      console.log(err);
    }
  }
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
      console.log(svrres.data);
      updateDetails(svrres.data.course[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourse();
  }, [User]);
  return (
    courseDetails && (
      <Box>
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          sx={{ mt: "2%", mb: "3%" }}
        >
          <Typography align="center" variant="h4">
            Basics
          </Typography>
        </Box>
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          <Box width="80%" sx={{ mb: "2%" }}>
            <Typography variant="body1" sx={{ mb: "1%" }}>
              Course Name:
            </Typography>
            <TextField
              name="name"
              value={courseDetails.name}
              onChange={onChange}
              fullWidth
            />
          </Box>
          <Box width="80%" sx={{ mb: "2%" }}>
            <Typography variant="body1" sx={{ mb: "1%" }}>
              Course Objective:
            </Typography>
            <TextField
              name="objective"
              value={courseDetails.objective}
              onChange={onChange}
              fullWidth
            />
          </Box>
          <Box width="80%" sx={{ mb: "2%" }}>
            <Typography variant="body1" sx={{ mb: "1%" }}>
              Course Description:
            </Typography>
            <TextField
              name="description"
              value={courseDetails.description}
              onChange={onChange}
              fullWidth
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            width="80%"
            sx={{ mb: "2%" }}
          >
            <Box sx={{ mb: "1%" }}>
              <Typography variant="body1">Course Goals:</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              width="100%"
            >
              {courseDetails.goals.map((goal, index) => {
                return (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    width="100%"
                   sx={{mb: "2%"}} 
                  >
                    <TextField
                      sx={{ flexGrow: "9" }}
                      name={`requirements[${index}]`}
                      key={index}
                      value={goal}
                      onChange={onChangeGoals(index)}
                    />
                    <IconButton
                      sx={{
                        flexGrow: "1",
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "transparent",
                        },
                      }}
                      size="large"
                      color="inherit"
                      onClick={deleteGoal(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
            <Button onClick={addGoal}>Add a Goal</Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            width="80%"
            sx={{ mb: "2%" }}
          >
            <Box sx={{ mb: "1%" }}>
              <Typography variant="body1">Course Requirements:</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              width="100%"
            >
              {courseDetails.requirements.map((requirement, index) => {
                return (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    width="100%"
                   sx={{mb: "2%"}} 
                  >
                    <TextField
                      sx={{ flexGrow: "9" }}
                      name={`requirements[${index}]`}
                      key={index}
                      value={requirement}
                      onChange={onChangeRequirement(index)}
                    />
                    <IconButton
                      sx={{
                        flexGrow: "1",
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "transparent",
                        },
                      }}
                      size="large"
                      color="inherit"
                      onClick={deleteRequirement(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
            <Button onClick={addRequirement}>Add a Requirement</Button>
          </Box>
          <Button onClick={updateDetailsBackend}>Save</Button>
        </Box>
      </Box>
    )
  );
};

export default Basics;
