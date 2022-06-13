import React from "react";
import classes from "./Courses.module.css";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Rating,
  Button,
  Popover,
  CardActions,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const CoursesCard = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDetail = Boolean(anchorEl);
  const openCourseDetail = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeCourseDetail = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      className={classes["course-card"]}
      key={props.course._id}
      onMouseEnter={openCourseDetail}
      onMouseLeave={closeCourseDetail}
    >
      <CardMedia
        component="img"
        height="120"
        image="https://ychef.files.bbci.co.uk/1600x900/p09f3lcg.webp"
        alt="course image"
      />
      <CardContent>
        <Link to={"/Course/" + props.course._id} className={classes.link}>
          <Typography
            sx={{ mb: 1 }}
            align="center"
            className={classes["course-card-nametypo"]}
          >
            {props.course.name}
          </Typography>
        </Link>
        <Link
          to={"/Instructor/" + props.course.instructor._id}
          className={classes.link}
        >
          <Typography variant="body5" align="left">
            {props.course.instructor.name}
          </Typography>
        </Link>
        <Stack>
          <Rating
            name="course-rating"
            size="small"
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
          <Typography variant="body2" align="left">
            {props.course.rating}
          </Typography>
        </Stack>
        <Typography>₹{props.course.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={openDetail}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        onClose={closeCourseDetail}
        disableRestoreFocus
      >
        <Card sx={{ width: 250 }}>
          <Box>
            <Typography variant="h6" align="center">
              {props.course.name}
            </Typography>
          </Box>
          <CardContent>
            <Box>{props.course.description}</Box>
            <Button sx={{justifyContent:"center"}}>Add To Cart</Button>
          </CardContent>
        </Card>
      </Popover>
    </Card>
  );
};

export default CoursesCard;
