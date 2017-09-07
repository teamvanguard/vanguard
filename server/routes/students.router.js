var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');
var pg = require('pg');
var constantModule  = require('../modules/roles.constants.js');

// roles:
// 1 = admin
// 2 = store manager
// 3 = teacher
// 4 = student


// router.get('/challenges/:student_id')
router.get('/challenges/:student_id', function(req, res) {
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
        var queryText = "SELECT student_challenge.student_id, " +
          "student_challenge.challengeId, student_challenge.pass, " +
          "users.name, challenges.challenge_name,challenges.description," +
          "challenges.start_date, challenges.end_date, challenges.pts_value, " +
          "FROM student_challenge JOIN challenges ON challenges.teacher_id = student_challenge.challengeId, " +
          "JOIN users ON users.student_id = student_challenge.student_id WHERE student_challenge.student_id = $1;";
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [req.params.student_id], function(errorMakingQuery, result) {
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
}); // end get /challenges/:student_id

router.post('/:id', function(req, res) {
  var timeStamp = new Date();
  if (req.isAuthenticated()) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    if (req.user.role == constantModule.STUDENT_ROLE || req.user.role == constantModule.ADMIN_ROLE) {
      pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
          console.log('Error connecting to the database.');
          res.sendStatus(500);
        } else {
          // We connected to the database!!!
          // Now we're going to POST things to the db
          var queryText = 'INSERT INTO student_challenge ("student_id", "challenge_id", pass, timestamp) VALUES ($1, $2, $3, $4 ); ';

          // errorMakingQuery is a bool, result is an object
          db.query(queryText, [req.user.id, req.params.id, 'true', timeStamp],
            function(errorMakingQuery, result) {
              done();

              if (errorMakingQuery) {
                console.log('Attempted to query with', queryText);
                console.log('Error making query', errorMakingQuery);
                res.sendStatus(500);
              } else {
                res.sendStatus(200);
              } // end of else
            }); //end of query
        } // end of else
      }); // end pool
    } else {
      res.sendStatus(401)
    }
  } else {
  res.sendStatus(401)
} // end of auth else
}); // end of POST

module.exports = router;
