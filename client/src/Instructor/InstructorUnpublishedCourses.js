import React,{useEffect} from "react";
import { Box,Card,CardContent,Typography,Button,CardActions } from "@mui/material";
import { useParams } from "react-router-dom";

const InstructorUnpublishedCourses = () => {
  let params = useParams();
  const [unpublishedCourses,setUnPublishedCourses] = React.useState([]);
  const host = "http://localhost:8000";
  const getUnpublishedCourses = async() => {
    let response = await fetch(`${host}/api/courses/${params.InstructorId}/unpublished`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  }

  useEffect(() => {
    const svrrres=getUnpublishedCourses();
    console.log(svrrres);
  }, [])
  return (
    <Box sx={{ display: "flex" }}>
      <Box height="20">
        {unpublishedCourses.map((course, index) => {
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {course.title}
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
        )
      </Box>
    </Box>
  );
};

export default InstructorUnpublishedCourses;
