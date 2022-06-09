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
        type: mongoose.Decimal128,
        default: 0,
      }
    },
    { timestamps: true }
  );
  

const Section = mongoose.model("Section", SectionSchema);
module.exports = Section;