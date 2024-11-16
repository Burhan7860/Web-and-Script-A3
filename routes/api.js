// Import required modules
const express = require("express");
const router = express.Router();
const Assignment = require("../model/assignment"); // Import the model with capitalized name

// Route to handle assignment creation
router.post("/create", async (req, res, next) => {
  try {
    // Destructure the fields needed for creating a new assignment
    const { assignment, course, duedate } = req.body;

    // Create a new assignment instance with provided details
    const newAssignment = new Assignment({
      assignment,
      course,
      duedate,
    });

    // Save the new assignment to the database
    await newAssignment.save();

    // Redirect to the home page with a success indicator
    res.redirect("/?submitted=true");
  } catch (error) {
    console.error(error); // Log error for debugging
    // Redirect to the home page with a failure indicator if an error occurs
    res.redirect("/?submitted=false");
  }
});

// Route to handle assignment editing
router.post("/edit", async (req, res, next) => {
  try {
    // Destructure required fields from request body
    const { id, assignment, course, duedate } = req.body;

    // Find the assignment by ID and update its details
    await Assignment.findByIdAndUpdate(id, {
      assignment,
      course,
      duedate,
    });

    // Redirect to the management page with a success indicator
    res.redirect("/manage?edited=true");
  } catch (error) {
    console.error(error); // Log error for debugging
    // Redirect to the management page with a failure indicator if an error occurs
    res.redirect("/manage?edited=false");
  }
});

// Route to handle assignment deletion
router.post("/delete", async (req, res, next) => {
  try {
    // Find the assignment by ID and delete it from the database
    await Assignment.findByIdAndDelete(req.body.id);

    // Redirect to the management page with a success indicator
    res.redirect("/manage?deleted=true");
  } catch (error) {
    console.error(error); // Log error for debugging
    // Redirect to the management page with a failure indicator if an error occurs
    res.redirect("/manage?deleted=false");
  }
});

module.exports = router;
