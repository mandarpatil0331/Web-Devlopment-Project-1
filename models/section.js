const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      lessons:[{
        type: mongoose.Schema.ObjectId,
        ref: "Lesson",
      }],
      assignments:[{
        type: mongoose.Schema.ObjectId,
        ref: "Assignment",
      }],
      totalTime:{
        hours:{type:Number,default:0},
        minutes:{type:Number,default:0},
      },
      course:{
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      }
    },

    { timestamps: true }
  );
  

const Section = mongoose.model("Section", SectionSchema);
module.exports = Section;