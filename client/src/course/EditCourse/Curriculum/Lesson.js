import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { Link } from "react-router-dom";

const Lesson = ({ lesson,updateLesson }) => {
  const lessonVideo = useRef();
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const progressBar = useRef();
  const [open, setOpen] = React.useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setFileInputState("");
    setVideoFilePath(null);
  };

  const handleVideoInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
    setVideoFilePath(URL.createObjectURL(e.target.files[0]));
    const lessonData = new FormData();
    lessonData.append("video", e.target.files[0]);
  };

  return (
    <>
      <ListItem button onClick={handleClickOpen}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${lesson.name}`}
          secondary={`${lesson.description}`}
        />
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Lesson</DialogTitle>
        <DialogContent>
          <Box>
            {videoFilePath && (
              <video
                src={videoFilePath}
                width="100%"
                height="100%"
                controls={true}
              />
            )}
            <input
              accept="video/mp4,video/x-m4v,video/*"
              style={{ display: "none" }}
              id="input-video"
              type="file"
              onChange={handleVideoInputChange}
              value={fileInputState}
            />
            <Box sx={{mt:"3%"}} display="flex" alignItems="center" justifyContent="center" >
            <label htmlFor="input-video">
              <Button variant="raised" component="div">
                Upload
              </Button>
            </label>
            </Box>
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="lessonName"
            label="Lesson Name"
            type="text"
            name="lessonName"
            value={lesson.name}
            fullWidth
            variant="standard"
            style={{ width: 700, marginBottom: 15 }}
          />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Lesson Description"
            type="text"
            fullWidth
            variant="standard"
            name="description"
            value={lesson.description}
            style={{ width: 700, marginBottom: 15 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateLesson}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Lesson;
