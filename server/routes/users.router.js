var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');
var pg = require('pg');
var sell = require('../modules/sell.item.module.js');
var constantModule  = require('../modules/roles.constants.js');

// roles:
// 1 = admin
// 2 = store manager
// 3 = teacher
// 4 = student

// get users
router.get('/', function(req, res){
  //everyone but students
  if(req.user.role == constantModule.ADMIN_ROLE || req.user.role == constantModule.STORE_MANAGER_ROLE || req.user.role == constantModule.TEACHER_ROLE) {
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
        '  "users"."username", "users"."student_id", "users"."pic",' +
        '  "users"."pts", "users"."lifetime_pts", "users"."email", "users"."employee_id", "users"."role"' +
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
  if(req.user.role == constantModule.ADMIN_ROLE || req.user.role == constantModule.STORE_MANAGER_ROLE || req.user.role == constantModule.TEACHER_ROLE){
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = ' SELECT id, name, pts, "users"."student_id" FROM users WHERE users.role = $1;';
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
  } else{res.sendStatus(401);} //not authorized
}); // end get /students route

//sell item to student
router.put('/sell', function(req, res) {
  console.log('users router put /sell');
  console.log(req.body);
  //only admins and managers
  if(req.user.role == constantModule.ADMIN_ROLE || req.user.role == constantModule.STORE_MANAGER_ROLE) {
    console.log('student', req.body.student);
    console.log('item', req.body.item);
    sell.sellItem(req.body.student, req.body.item, res, req);
  } else{res.sendStatus(200);} //not authorized
});

//get all transactions
router.get('/transactions', function(req, res) {
  console.log('users router get /transactions');
  //only admins
  if(req.user.role == constantModule.ADMIN_ROLE || req.user.role == constantModule.STORE_MANAGER_ROLE) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'SELECT transactions.pts, transactions.timestamp, employees."employee_id",' +
        'employees.name AS "employeeName", students.name AS "studentName", challenges.challenge_name AS "challengeName", ' +
        'items.item_name AS "itemName", students."student_id", transactions.type FROM transactions ' +
        'JOIN users employees ON "transactions"."employee_id" = employees.id ' +
        'JOIN users students ON "transactions"."student_id" = students.id ' +
        'LEFT OUTER JOIN items ON "transactions"."item_id" = items.id ' +
        'LEFT OUTER JOIN challenges ON "transactions"."challenge_id" = challenges.id;';
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
  if(req.user.role == constantModule.ADMIN_ROLE) {
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
router.put('/', function(req, res) {
  console.log('usersRouter put');
  console.log('updatedUser', req.body);
  var updatedUser = req.body;
  //sets the item to be updated to a variable
  //checks if user is logged in
  if(req.isAuthenticated()){
    //checks if user is authorized
    if(req.user.role == constantModule.ADMIN_ROLE) {
      pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
          console.log('Error connecting to the database.');
          res.sendStatus(500);
        } else {
          // set query
         var queryText = 'UPDATE users SET name = $1, student_id = $2, email = $3, role = $4 WHERE id = $5';
          db.query(queryText, [updatedUser.name, updatedUser.student_id, updatedUser.email, updatedUser.role, updatedUser.id],
            function(errorMakingQuery, result) {
              //return connection to pool
              done();
              if (errorMakingQuery) {
                console.log('Attempted to query with', queryText);
                console.log('Error making query');
                res.sendStatus(500);
              } else {
                console.log('user updated');
                // Send back the results
                res.sendStatus(200);
              }
            }); // end query
          } // end if
        }); // end pool
      } else {res.sendStatus(401)}
    } else {res.sendStatus(401)}
  }); // end of PUT

//delete a user
router.delete('/:id', function(req, res) {
  console.log('users router delete a user');
  var userToDelete = req.params.id;
  console.log(userToDelete);
  if (req.user.role == constantModule.ADMIN_ROLE) {
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'DELETE FROM users WHERE id = $1;';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [userToDelete], function(errorMakingQuery, result){
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
  }else{res.sendStatus(401)}
});


//select all users of a specific role
router.get('/:role', function(req, res) {
  console.log('users router get by role');
  //only admins
  if(req.user.role == constantModule.ADMIN_ROLE) {
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'SELECT "username", "email", "role", "employee_id", ' +
        '"student_id", "pts", "name" FROM users WHERE role = $1;';
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


module.exports = router;
