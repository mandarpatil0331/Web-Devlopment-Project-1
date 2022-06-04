import React,{useEffect,useContext} from "react";
import { Box,Card,CardContent,Typography,Button,CardActions } from "@mui/material";
import AuthContext  from "../context/AuthContext";

const InstructorUnpublishedCourses = () => {
  const {User}=useContext(AuthContext);
  const [unpublishedCourses,setUnpublishedCourses] = React.useState([]);
  const host = "http://localhost:8000";
  const getUnpublishedCourses = async() => {
    try{
    let response = await fetch(`${host}/api/courses/${User._id}/unpublished`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const svrres=await response.json();
    console.log(svrres.data.courses);
    setUnpublishedCourses((prevunpublishedcourses)=>{return svrres.data.courses});
  }catch(err){console.log(err)}  
  }

  useEffect(() => {
    getUnpublishedCourses();
  }, [User])
  const loadedCourses=(<Box height="20">
  {unpublishedCourses.map((course) => {
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {course.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>;
  })}
</Box>)
  return (
    <Box sx={{ display: "flex" }}>
      {unpublishedCourses.length>0?loadedCourses:<Box>No unpublished courses</Box>}
    </Box>
  );
};

export default InstructorUnpublishedCourses;
