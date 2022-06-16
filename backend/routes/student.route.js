let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student model
let studentScheme = require("../models/Student");

//Create Student
router.route("/create-student").post((req, res, next) => {
  studentScheme.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

//Read student
router.route("/").get((req, res) => {
  studentScheme.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//Get Single Student
router.route("/edit-student/:id").get((req, res) => {
  studentScheme.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//Update Student
router.route("/update-student/:id").put((req, res, next) => {
  studentScheme.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Student update succesful");
      }
    }
  );
});

//Delete Student
router.route("/delete-student/:id").delete((req, res, next) => {
  studentScheme.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
