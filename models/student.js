const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
// const messageSchema=new Schema({

// })

const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    unique: "Email already exists",
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 3,
    select: false
  },
  address: {
    type: String,
    minLength: 5,
    maxLength: 50,
    default:null
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    default:null
  },
  accounts: [
    {
      type: String,
    },
  ],
  enrollments:[{
    type:mongoose.Schema.ObjectId,
    ref:"Enrollment"
  }],
  messages : [{
    type:String,
  }],
  completedEnrollments:[{
    type:mongoose.Schema.ObjectId,
    ref:"Enrollment"
  }],
},{timestamps:true});
studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  studentSchema.pre('findByIdAndUpdate',async function (next) {
    //let update = this.getUpdate();
    console.log(this);
    if (!update.password) {
        return next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(update.password, salt);
    next();
  })
  
  studentSchema.methods.checkPassword = async function (
    enteredPassword,
    correctPassword
  ) {
    return await bcrypt.compare(enteredPassword, correctPassword);
  };

  const Student = mongoose.model("Student", studentSchema);

module.exports = Student;