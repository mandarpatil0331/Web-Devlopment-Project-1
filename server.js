const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//MONGODB connection

main().catch((err) => console.log(err));

async function main() {
  //console.log(process.env);
  mongoose.connect(process.env.ATLAS_URI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("MongoDB connection established successfully !");
  });
}
// SERVER
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} ...`);
});
