const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const ReviewRatingSchema = new Schema(
  {
    enrollment:{
      type: mongoose.Schema.ObjectId,
      ref: "Enrollment",
    },
    review:{
      type: String,
      default: "",
    },
    rating:{
      type: Number,
        min:0,
        max:5,
        default: 0
    }
  },
  { timestamps: true }
);
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
    sectionProgress:[{
      section: {type: mongoose.Schema.ObjectId, ref: 'Section'},
      sectionComplete:{type: Boolean,default:false},
      timeCompleted:{type:mongoose.Decimal128}
     }],
     complete:{
       type: Boolean,
       default:false
     },
     reviewRating:{
        type: mongoose.Schema.ObjectId,
        ref: 'ReviewRating'
      }
},{timestamps:true});
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
const Notes=mongoose.model("Notes",notesSchema);
const ReviewRating=mongoose.model("ReviewRating",ReviewRatingSchema);

module.exports = Enrollment;
