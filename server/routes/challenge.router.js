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
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDatabase, db, done) {
      if (errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        var queryText;
        // gets items with the name of the last person who edited for the store and adim
        if (req.user.role == 4) {

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
  } else {
    req.sendStatus(401)
  }
}); // end of GET

// NOTE Post challenges
// Using a router drops the part of the url used to get here
// http://localhost:5000/books/ would '/'
router.post('/', function(req, res) {
  var newChallenge = req.body;
  console.log('router side of challenge:', newChallenge);
  if (req.isAuthenticated()) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    if (req.user.role == 3 || req.user.role == 1) {
      pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
          console.log('Error connecting to the database.');
          res.sendStatus(500);
        } else {
          // We connected to the database!!!
          // Now we're going to POST things to the db
          var queryText = "INSERT INTO challenges (name, description, start_date, end_date, pts_value, teacher_id) " +
            "VALUES ($1, $2, $3, $4, $5, $6); ";

          // errorMakingQuery is a bool, result is an object
          db.query(queryText, [newChallenge.name, newChallenge.description, newChallenge.start_date, newChallenge.end_date, newChallenge.pts_value, req.user.id],
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

//NOTE put route for challenges
router.put('/', function(req, res) {
  console.log('challengesRouter put');
  console.log('updatedChallenge', req.body);
  //sets the challenge to be updated to a variable
  var updatedChallenge = req.body;
  //checks if user is logged in
  if (req.isAuthenticated()) {
    //checks if user is authorized
    if (req.user.role == 3 || req.user.role == 1) {
      pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
          console.log('Error connecting to the database.');
          res.sendStatus(500);
        } else {
          // set query
          var queryText = 'UPDATE challenges SET name = $1, description = $2, start_date = $3, end_date = $4, pts_value = $5 WHERE id = $6';
          db.query(queryText, [updatedChallenge.name, updatedChallenge.description, updatedChallenge.start_date, updatedChallenge.end_date, updatedChallenge.pts_value, req.user.id],
            function(errorMakingQuery, result) {
              //return connection to pool
              done();
              if (errorMakingQuery) {
                console.log('Attempted to query with', queryText);
                console.log('Error making query');
                res.sendStatus(500);
              } else {
                console.log('item updated');
                // Send back the results
                res.sendStatus(200);
              }
            }); // end query
        } // end if
      }); // end pool
    } else {
      res.sendStatus(401)
    }
  } else {
    res.sendStatus(401)
  }
}); // end of PUT

//NOTE Delete route for teacher/challenges
router.delete('/:id', function(req, res) {
  console.log('itemsRouter delete');
  //sets id of item to delete to a variable
  var challengeDelete = req.params.id;
  //checks if user is logged in
  if(req.isAuthenticated()){
    //checks if user is authorized
    if(req.user.role == 2 || req.user.role == 1) {
      pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
          console.log('Error connecting to the database.');
          res.sendStatus(500);
        } else {
          // sets up query
          var queryText = 'DELETE FROM challenges WHERE id = $1';
          db.query(queryText, [challengeDelete], function(errorMakingQuery, result) {
            //returns connection to pool
            done();
            if (errorMakingQuery) {
              console.log('Attempted to query with', queryText);
              console.log('Error making query');
              res.sendStatus(500);
            } else {
              console.log('item deleted');
              // Send back the results
              res.sendStatus(200);
            }
          }); // end query
        } // end if
      }); // end pool
    } else {res.sendStatus(401)}
  } else {res.sendStatus(401)}
}); // end of DELETE




module.exports = router;
