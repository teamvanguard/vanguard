var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool.js');

// roles:
// 1 = admin
// 2 = store manager
// 3 = teacher
// 4 = student

//creates a new item
router.post('/', function(req,res){
  console.log('itemsRouter post');
  //set new item to a variable
  var newItem = req.body;
  console.log('newItem', newItem);
  //checks if user is logged in
  if(req.isAuthenticated()){
    //checks if user has authorization (1 is admin and 2 is store manager)
    if(req.user.role == 2 || req.user.role == 1) {
      pool.connect(function(err, client, done) {
        if(err) {
          console.log("Error connecting: ", err);
          next(err);
        }
        //write query
        var queryText = "INSERT INTO items (item_name, item_description, pts_value, qty, school_community, last_edit_user_id) VALUES ($1, $2, $3, $4, $5, $6);"
        client.query(queryText,
        [newItem.name, newItem.description, newItem.pts_value, newItem.qty, newItem.school_community, req.user.id],
        function (err, result) {
          //return connection to pool
          done();
          if(err) {
            console.log('Attempted to query with', queryText)
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.sendStatus(200);
          }
        });//end of query
      });//end of pool
    } else {res.sendStatus(401)}
    console.log("response, 45");
  } else {res.sendStatus(401)
    console.log("res, 47");
}
});

router.get('/', function(req, res) {
  console.log('itemsRouter get');
  //check if user logged in
  if(req.isAuthenticated()){
    pool.connect(function(errorConnectingToDatabase, client, done) {
      if (errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // gets items with the name of the last person who edited for the store and adim
        if(req.user.role == 2 || req.user.role == 1) {
          var queryText = 'SELECT items.id, items.item_name, items.item_description, items.pts_value, items.pic, items.school_community, users.name, items.qty FROM items JOIN users ON users.id = items.last_edit_user_id ORDER BY items.id ASC;';
          //var queryText = 'SELECT items.item_name, items.item_description, items.pts_value, items.pic, items.school_community, users.name FROM items JOIN users ON users.id = items.last_edit_user_id;';
        }
        // gets just the items for the students and teachers
        else {
          var queryText = 'SELECT item_name, item_description, pts_value, qty, pic, school_community, qty FROM items ORDER BY id ASC;';
        }
        // errorMakingQuery is a bool, result is an object
        client.query(queryText, function(errorMakingQuery, result) {
          //returns connection to pool
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
  } else {res.sendStatus(401)}
}); // end of GET

router.put('/', function(req, res) {
  console.log('itemsRouter put');
  console.log('updatedItem', req.body);
  //sets the item to be updated to a variable
  var updatedItem = req.body;
  //checks if user is logged in
  if(req.isAuthenticated()){
    //checks if user is authorized
    if(req.user.role == 2 || req.user.role == 1) {
      pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
          console.log('Error connecting to the database.');
          res.sendStatus(500);
        } else {
          // set query
          var queryText = 'UPDATE items SET item_name = $1, item_description = $2, pts_value = $3, school_community = $4, last_edit_user_id = $5 WHERE id = $6';
          db.query(queryText,
            [updatedItem.item_name, updatedItem.item_description, updatedItem.pts_value, updatedItem.school_community, req.user.id, updatedItem.id],
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
      } else {res.sendStatus(401)}
    } else {res.sendStatus(401)}
  }); // end of PUT

  router.delete('/:id', function(req, res) {
    console.log('itemsRouter delete');
    //sets id of item to delete to a variable
    var itemToDelete = req.params.id;
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
            var queryText = 'DELETE FROM items WHERE id = $1';
            db.query(queryText, [itemToDelete], function(errorMakingQuery, result) {
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
  }); // end of GET

  module.exports = router;
