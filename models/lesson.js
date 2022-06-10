const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const LessonSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    resourceUrl: {
      type: String,
    },
    time:{
      hours:{type:Number,default:0},
      minutes:{type:Number,default:0},
    },
    section:{
      type: Schema.Types.ObjectId,
      ref: "Section"
    }
  },
  { timestamps: true }
);

const Lesson = mongoose.model("Lesson", LessonSchema);
module.exports=Lesson;
