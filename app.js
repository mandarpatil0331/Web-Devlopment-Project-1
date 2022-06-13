const express = require("express");
const path = require("path");
const cors=require("cors");
const educatorRoutes=require("./routes/educator");
const studentRoutes=require("./routes/student");
const courseRoutes=require("./routes/course");
const authRoutes=require("./routes/auth");
const enrollmentRoutes=require("./routes/enrollment")
const sectionRoutes=require("./routes/section");
const lessonRoutes=require("./routes/lesson");
const AppError = require("./utils/appError");


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use("/api",authRoutes);
app.use("/api", educatorRoutes);
app.use("/api",studentRoutes);
app.use("/api",courseRoutes);
app.use("/api",enrollmentRoutes);
app.use("/api",lessonRoutes);
app.use("/api",sectionRoutes);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

module.exports = app;