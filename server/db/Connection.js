const mongoose = require("mongoose");

const URL =
  "mongodb+srv://user:stocky@stocky-users-sholn.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connected");
};

module.exports = {connectDB,URL};
