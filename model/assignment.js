// Mongoose schema definition for assignment model with fields for assignment, course, and due date
let mongoose = require("mongoose");
let assignmentSchema = new mongoose.Schema({
  assignment: String,
  course: String,
  duedate: String,
});
module.exports = mongoose.model("assignment", assignmentSchema);
