var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');
var pg = require('pg');
var sell = require('../modules/sell.item.module.js');

// roles:
// 1 = admin
// 2 = store manager
// 3 = teacher
// 4 = student

// get users
router.get('/', function(req, res){
  //everyone but students
  if(req.user.role == 1 || req.user.role == 2 || req.user.role == 3) {
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
        '  "users"."pts", "users"."lifetimePts", "users"."email", "users"."employeeid"' +
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
  }else{res.sendStatus(401)} //not authorized
}); // end of GET

//get list of students
router.get('/students', function(req, res) {
  console.log('users router get /students');
  //everyone but students
  if(req.user.role == 1 || req.user.role == 2 || req.user.role == 3){
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'SELECT "username", "studentId", "pts" FROM users WHERE role = 4;';
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
  } else{res.sendStatus(200);} //not authorized
}); // end get /students route

//sell item to student
router.put('/sell', function(req, res) {
  console.log('users router put /sell');
  console.log(req.body);
  //only admins and managers
  if(req.user.role == 1 || req.user.role == 2) {
    sell.sellItem(req.body.student, req.body.item, res, req);
  } else{res.sendStatus(200);} //not authorized
});

//select all users of a specific role
router.get('/:role', function(req, res) {
  console.log('users router get by role');
  //only admins
  if(req.user.role == 1) {
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'SELECT "username", "email", "role", "employeeid", "studentId", "pts", "name" FROM users WHERE role = $1;';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [req.params.role], function(errorMakingQuery, result){
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
  }else{res.sendStatus(401);} //not authorized
});

//get all transactions
router.get('/transactions', function(req, res) {
  console.log('users router get /transactions');
  //only admins
  if(req.user.role == 1 || req.user.role == 2) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'SELECT "studentId", "pts", "employeeId", "timestamp", "itemId", "challengeID" FROM transactions;';
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
  } else{res.sendStatus(401);} //not authorized
}); // end of get /transactions

//create a teacher or admin or manager
router.post('/', function(req, res) {
  console.log('users router post create teacher or manager or admin');
  console.log(req.body);
  //only admins
  if(req.user.role == 1) {
    var newUser = req.body
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'INSERT INTO users (email, role) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET role = $2;';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [newUser.email, newUser.role], function(errorMakingQuery, result){
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
  } else{res.sendStatus(401);} //not authorized
});

//edit a user role
router.put('/', function(req, res) {
  console.log('users router put edit user role');
  console.log(req.body);
  //only admins
  if(req.user.role == 1){
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'UPDATE users SET role = $2 WHERE email = $1;';
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

//delete a user
router.delete('/:id', function(req, res) {
  console.log('users router delete a user');
  res.sendStatus(200);
});



module.exports = router;
