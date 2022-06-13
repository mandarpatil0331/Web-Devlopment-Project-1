import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  IconButton,
  LinearProgress,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const MyLearningCards = (props) => {
    const imageWidth=props.imageWidth
    const width=props.width
  return (
    <Card
      key={props.enrollment.course._id}
      sx={{ display: "flex", justifyContent: "space-between" ,mb:3,width:width}}
    >
      <CardMedia
        component="img"
        sx={{ width: imageWidth}}
        image="https://ychef.files.bbci.co.uk/1600x900/p09f3lcg.webp"
        alt="CourseImage"
      />
      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.enrollment.course.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.enrollment.course.description}
          </Typography>
        </CardContent>
        <Box display="flex" justifyContent="flex-end">
          <IconButton size="large">
            <PlayCircleIcon />
          </IconButton>
        </Box>
        <LinearProgress variant="determinate" value={50} />
      </Box>
    </Card>
  );
};

export default MyLearningCards;
