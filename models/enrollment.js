const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const notesSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "Title is required"],
      },
      description: {
        type: String,
        required: [true, "Content is required"]
      }
      ,lesson:{
        type: mongoose.Schema.ObjectId, ref: 'Lesson'
      }
    },
    { timestamps: true }
  );
const enrollmentSchema = new Schema({
    course: {
        type:mongoose.Schema.ObjectId,
        ref:"Course"
    },
    student: {
        type:mongoose.Schema.ObjectId,
        ref:"Student"
    },
    notes:
    [
        notesSchema
    ],
    review:
        {
            type:String,
            default:null
        }
    ,
    rating: {
        type: Number,
        min:0,
        max:5,
        default: 0
    },
    lessonsProgress:[{
      lesson: {type: mongoose.Schema.ObjectId, ref: 'Lesson'},
      complete: Boolean
     }],
     complete:{
       type: Boolean,
       default:false
     }
    
},{timestamps:true});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;