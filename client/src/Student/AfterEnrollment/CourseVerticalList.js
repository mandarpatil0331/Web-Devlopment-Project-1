import React,{useContext, useEffect} from "react";
import { Box,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Collapse} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Link, Outlet,useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import VerticalListSection from "./VerticalListSection";

const CourseVerticalList = () => {
    const [open, setOpen] = React.useState(true);
    const [enrollment,setEnrollment] = React.useState({});
    const params = useParams();
    const host = "http://localhost:8000";
    const enrollmentUpdate = (enrollments) => {
        console.log("State function called!");
        setEnrollment((prevenroll) => {
          return enrollments;
        });
      };
    const handleClickCourse = () => {
      setOpen(!open);
    };
    const getCourse = async() => {
        try {
            let response = await fetch(
              `${host}/api/enrollments/${params.EnrollmentId}`,
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
            console.log(svrres.data.enrollment);
            enrollmentUpdate(svrres.data.enrollment);
          } catch (err) {
            console.log(err);
          }
        }
 useEffect(() => {
    getCourse()
 } ,[])
  return (enrollment.course && <>
    <Box component="div" sx={{ display: "flex",flexDirection:"row"}} >
  <Box sx={{flexGrow:1}}>
    <List
      sx={{ width: "100%", bgcolor: "background.paper"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
       { enrollment.course.sections.map((section) => {
        return (
            <VerticalListSection section={section} key={section._id} StudentId={params.StudentId} EnrollmentId={params.EnrollmentId}/>
        )
        })
    }

      
    </List>
  </Box>
  <Box sx={{flexGrow:10}}>
    <Outlet enrollment={enrollment} />
  </Box>
</Box>
    </>
  )
}

export default CourseVerticalList