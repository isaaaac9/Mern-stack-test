const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let studentScheme = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    rollno: {
      type: Number,
    },
  },
  {
    collection: "students",
  }
);

module.exports = mongoose.model("Student", studentScheme);
