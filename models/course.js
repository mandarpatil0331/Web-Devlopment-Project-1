const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const LessonSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "Title is required"],
      },
      description: {
        type: String,
        required: [true, "Description is required"]
      },
      resourceUrl: {
        type: String,
      },
      assignmentUrl:
      [
          {
             type: String
          }
      ]
    },
    { timestamps: true }
  );

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    instructor: {
        type:mongoose.Schema.ObjectId,
        ref:"Educator"
    },
    description:
    {
        type:String,
        default:null
    },
    image:
    {
      data: Buffer,
    contentType: String,
    }
    ,
    published:
    {
      type: Boolean,
      default: false,
    }
,
    enrollments:
    [
        {
            type:mongoose.Schema.ObjectId,
            ref:"Enrollment"
        }
    ],
    lessons: [LessonSchema],
    category:[{
      type:String
    }],
    price:{
      type:Number,
      min:0
    }
    
})

const Course = mongoose.model("Course", courseSchema);
const Lesson = mongoose.model('Lesson', LessonSchema)


module.exports = Course;