const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: "Educator",
    },
    objective:{
      type: String,
      required: [true, "Objective is required"],
    },
    description: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    enrollments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Enrollment",
      },
    ],
    reviews:[{
      type: mongoose.Schema.ObjectId,
      ref: "ReviewRating",
    }],
    totalEnrollments: {
      type: Number,
      default: 0,
    },
    avgRatings:{
      type: Number,
      default: 0,
    },
    sections:[{
      type: mongoose.Schema.ObjectId,
      ref: "Section",
    }],
    courseGoals:[{
      type: String,
    }],
    totalContentTime:{
      hours:{type:Number,default:0},
      minutes:{type:Number,default:0},
    },
    category: [
      {
        type: String,
      },
    ],
    requirements: [{
      type: String,
    }],
    price: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
