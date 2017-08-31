var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');
var pg = require('pg');

// roles:
// 1 = admin
// 2 = store manager
// 3 = teacher
// 4 = student


// router.get('/challenges/:studentId')
router.get('/challenges/:studentId', function(req, res) {
  console.log('students router get /challenges');
  //everyone but students
  if (req.isAuthenticated()) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done) {
      if (errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = "SELECT student_challenge.studentId, " +
          "student_challenge.challengeId, student_challenge.pass, " +
          "users.name, challenges.challenge_name,challenges.description," +
          "challenges.start_date, challenges.end_date, challenges.pts_value, " +
          "FROM student_challenge JOIN challenges ON challenges.teacher_id = student_challenge.challengeId, " +
          "JOIN users ON users.studentId = student_challenge.studentId WHERE student_challenge.studentId = $1;";
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [req.params.studentId], function(errorMakingQuery, result) {
          done();
          if (errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {

            console.log(result.rows);
            // Send back the results
            res.send(result.rows);
          }
        }); // end query
      } // end if
    }); // end pool
  } else {
    res.sendStatus(401);
  } //not authorized
}); // end get /challenges/:studentId


//edit a user role
router.post('/challenges/addStudent', function(req, res) {
  console.log('students router post add student');
  console.log(req.body);
  //only admins
  if(req.isAuthenticated()){
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = ;
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [req.body.email, req.body.role], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            // console.log(result.rows);
            // Send back the results
            res.send(result.rows);
          }
        }); // end query
      } // end if
    }); // end pool
  } else {res.sendStatus(401);} //not authorized
});




module.exports = router;
