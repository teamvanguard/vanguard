var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');
var pg = require('pg');

//NOTE get users
router.get('/', function(req, res){
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'SELECT "users"."id", "users"."name",' +
      '  "users"."username", "users"."studentId", "users"."pic",' +
      '  "users"."pts", "users"."lifetimePts", "users"."email"'+
      'FROM "users" ORDER BY "role", "username" ASC;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
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
}); // end of GET

//get list of students
router.get('/students', function(req, res) {
  console.log('users router get /students');
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = ' SELECT id, name, pts, "users"."studentId" FROM users WHERE users.role = $1;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, ['4'], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
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
});

//sell item to student
router.put('/sell', function(req, res) {
  console.log('users router put /sell');
  res.sendStatus(200);
});

//select all users of a specific role
router.get('/:role', function(req, res) {
  console.log('users router get by role');
  res.sendStatus(200);
});

//get all transactions
router.get('/transactions', function(req, res) {
  console.log('users router get /transactions');
  res.sendStatus(200);
});

//create a teacher or admin or manager
router.post('/', function(req, res) {
  console.log('users router post create teacher or manager or admin');
  res.sendStatus(200);
});

//edit a user role
router.put('/', function(req, res) {
  console.log('users router put edit user role');
  res.sendStatus(200);
});

//delete a user
router.delete('/:id', function(req, res) {
  console.log('users router delete a user');
  res.sendStatus(200);
});

module.exports = router;
