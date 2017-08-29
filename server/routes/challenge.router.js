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

// NOTE GET challenges
router.get('/', function(req, res) {
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done

  console.log(req.body);
if(req.isAuthenticated()){
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText;
      // gets items with the name of the last person who edited for the store and adim
      if(req.user.role == 4) {

         queryText = "SELECT challenges.name, " +
          "challenges.description, challenges.start_date, " +
          "challenges.end_date, challenges.pts_value, challenges.teacher_id " +
          "FROM challenges JOIN users ON users.id = challenges.teacher_id " +
          "ORDER BY start_date ASC;";

      }
      // gets just the items for the students and teachers
      else {
        queryText = "SELECT challenges.name, challenges.description, " +
        "challenges.start_date, challenges.end_date, challenges.pts_value " +
        "FROM challenges " +
        "JOIN users ON users.id = challenges.teacher_id " +
        "ORDER BY start_date ASC;";
      }
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, function(errorMakingQuery, result) {
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
} else {req.sendStatus(401)}
}); // end of GET

// NOTE Post challenges
// Using a router drops the part of the url used to get here
// http://localhost:5000/books/ would '/'
router.post('/', function(req, res) {
      var challenge = req.body;
      console.log('router side of challenge:', challenge);
      // errorConnecting is bool, db is what we query against,
      // done is a function that we call when we're done
      pool.connect(function(errorConnectingToDatabase, db, done) {
          if (errorConnectingToDatabase) {
            console.log('Error connecting to the database.');
            res.sendStatus(500);
          } else {
            // We connected to the database!!!
            // Now we're going to POST things to the db
            var queryText = "INSERT INTO challenges (name, descriptin, start_date, end_date, pts_value, teacher_id) " +
              "VALUES ($1, $2, $3, $4, $5, $6);";

            // errorMakingQuery is a bool, result is an object
            db.query(queryText, [challenge.name, challenge.description, challenge.start_date, challenge.end_date, challenge.pts_value, req.user.id], function(errorMakingQuery, result) {
                done();

                if (errorMakingQuery) {
                  console.log('Attempted to query with', queryText);
                  console.log('Error making query', errorMakingQuery);
                  res.sendStatus(500);
                } else {
                  res.sendStatus(200);
                }
              }); // end query

            } // end of else
          }); // end pool
      }); // end of POST




    module.exports = router;
