var pool = require('../modules/pool.js');

var sellingModule = {
  sellItem: function(student, item, res, req){
    console.log('sell item');
    //get the item info from the database
    findItem(student, item, res, req);
  }
}

//find item info in database
function findItem(student, item, res, req) {
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      cancelTransaction(student, item, res, req);
    } else {
      var queryText = 'SELECT * FROM items WHERE id = $1;';
      db.query(queryText, [item.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          cancelTransaction(student, item, res, req);
        } else {
          var selectedItem = result.rows[0];
          // find student in database
          findStudent(student, selectedItem, res, req)
        }
      }); // end query
    } // end if
  }); // end pool
};

// find student in database
function findStudent(student, item, res, req) {
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      cancelTransaction(student, item, res, req);
    } else {
      var queryText = 'SELECT * FROM users WHERE "id" = $1;';
      db.query(queryText, [student.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          cancelTransaction(student, item, res, req);
        } else {
          var selectedStudent = result.rows[0];
          if (selectedStudent.pts > item.pts_value && item.qty > 0) {
            subtractQty(selectedStudent, item, res, req);
          }
          // no items left
          else if (item.qty <= 0) {
            console.log('Out of item');
            cancelTransaction(student, item, res, req);
          }
          // student doesn't have enough points
          else {
            console.log('not enough points');
            cancelTransaction(student, item, res, req);
          }
        }
      }); // end query
    } // end if
  }); // end pool
};

// subtract qty from item
function subtractQty(student, item, res, req){
  if(item.qty > 0){
    // sets newQty to item qty minus 1
    var newQty = item.qty - 1;
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        cancelTransaction(student, item, res, req);
      } else {
        var queryText = 'UPDATE items SET qty = $1 WHERE id = $2';
        db.query(queryText, [newQty, item.id], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            cancelTransaction(student, item, res, req);
          } else {
            //subrtact points from student
            subtractPoints(student, item, res, req)
          }
        }); // end query
      } // end if
    }); // end pool
  }
};

//subrtact points from student
function subtractPoints(student, item, res, req) {
  if (student.pts > item.pts_value) {
    // subtract cost of item from student points
    var newPts = student.pts - item.pts_value;
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        cancelTransaction(student, item, res, req, 'item');
      } else {
        var queryText = 'UPDATE users SET pts = $1 WHERE "id" = $2';
        db.query(queryText, [newPts, student.id], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            cancelTransaction(student, item, res, req, 'item');
          } else {
            // create row on transactions table
            addTransaction(student, item, res, req);
          }
        }); // end query
      } // end if
    }); // end pool
  }
};

// create row on transactions table
function addTransaction(student, item, res, req){
  pool.connect(function(errorConnectingToDatabase, db, done){
    //current time and date for timestamp
    var timestamp = new Date();
    console.log(timestamp);
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      cancelTransaction(student, item, res, req, 'user');
    } else {
      var queryText = 'INSERT INTO transactions ("student_id", "pts", "employee_id", "timestamp", "item_id", "type") ' +
      'VALUES ($1, $2, $3, $4, $5, $6)';
      // creates row with a negative point value
      db.query(queryText, [student.id, '-' + item.pts_value, req.user.id, timestamp, item.id, 'sale'],
        function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          cancelTransaction(student, item, res, req, 'user');
        } else {
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
};

//if there is an error at any point after the db has been changed this function will reset all changes
function cancelTransaction(student, item, res, req, point) {
  console.log('transaction canceled');
  // if the error happens after the item qty has been subtracted and before
  // the users points have been subtracted
  if(point == 'item'){
    console.log('error after qty was subtracted');
    addQty(student, item, res, req);
  }
  // if the error happens after the item qty has been subtracted and the users
  // points have been subracted
  else if (point == 'user') {
    console.log('error after qty and points were subtracted');
    addQty(student, item, res, req, addPoints);
  }
  // if neither item qty and user points have been subtracted
  else {
    console.log('see error message above');
    res.sendStatus(500);
  }
}

//sets item qty to original amount if there was an error
function addQty(student, item, res, req, cb) {
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'UPDATE items SET qty = $1 WHERE id = $2';
      // uses qty recieved from db
      db.query(queryText, [item.qty, item.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // check if
          if(cb) {
            console.log('item qty reset');
            cb(student, item, res, req);
          } else {
            console.log('item qty reset');
            res.sendStatus(500);
          }
        }
      }); // end query
    } // end if
  }); // end pool
}

// sets students points back to orginal ammout if there was an error
function addPoints(student, item, res, req) {
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'UPDATE users SET pts = $1 WHERE "id" = $2';
      // uses points recieved from db
      db.query(queryText, [student.pts, student.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log('student pts reset');
          res.sendStatus(500);
        }
      }); // end query
    } // end if
  }); // end pool
}

module.exports = sellingModule;
