// Import required modules
var express = require("express");
var router = express.Router();
var crypto = require("crypto");
var assignment = require("../model/assignment"); // Ensure model is imported as assignment

// Route to render the home page
router.get("/", function (req, res, next) {
  if (req.query.submitted == "true") {
    res.render("index", {
      title: "Burhan's Assignment Tracker",
      submitted: true,
    });
  } else if (req.query.submitted == "false") {
    res.render("index", {
      title: "Burhan's Assignment Tracker",
      submitted: false,
    });
  } else {
    res.render("index", { title: "Burhan's Assignment Tracker" });
  }
});

// Route to render the assignment Creator page
router.get("/editor", async (req, res, next) => {
  try {
    // Use assignment (the model) here consistently
    let foundassignment = await assignment.findById(req.query.id);
    if (foundassignment) {
      res.render("editor", {
        title: "Assignment Creator",
        assignment: foundassignment,
      });
    } else {
      res.render("editor", { title: "Assignment Creator" });
    }
  } catch (error) {
    console.error(error);
    res.render("editor", { title: "Assignment Creator", error: error.message });
  }
});

// Route to render the Manage assignment page
router.get("/manage", async (req, res, next) => {
  // Fetch all assignments from the database
  const assignment_list = await assignment.find(); // Use assignment here as well
  // Check the 'edited' and 'deleted' query parameters to determine the render state
  if (req.query.edited == "true") {
    res.render("manage", {
      title: "Manage Assignments",
      assignment_list: assignment_list,
      edited: true,
    });
  } else if (req.query.edited == "false") {
    res.render("manage", {
      title: "Manage Assignments",
      assignment_list: assignment_list,
      edited: false,
    });
  } else if (req.query.deleted == "true") {
    res.render("manage", {
      title: "Manage Assignments",
      assignment_list: assignment_list,
      deleted: true,
    });
  } else if (req.query.deleted == "false") {
    res.render("manage", {
      title: "Manage Assignments",
      assignment_list: assignment_list,
      deleted: false,
    });
  } else {
    res.render("manage", {
      title: "Manage Assignments",
      assignment_list: assignment_list,
    });
  }
});

module.exports = router;
