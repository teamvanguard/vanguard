var pool = require('../modules/pool.js');

var sellingModule = {
  sellItem: function(student, item, res, req){
    //get the item info from the database
    findItem(student, item, res, req);
  }
}

//find item info in database
function findItem(student, item, res, req) {
  console.log('item', item);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM items WHERE id = $1;';
      db.query(queryText, [item.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log('item from db', result.rows);
          // Send back the results
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
  console.log('student', student);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM users WHERE "id" = $1;';
      db.query(queryText, [student.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // Send back the results
          var selectedStudent = result.rows[0];
          console.log('selectedStudent from db', selectedStudent);
          console.log(item);
          if (selectedStudent.pts > item.pts_value && item.qty > 0) {
            subtractQty(selectedStudent, item, res, req);
          } else if (item.qty <= 0) {
            console.log('Out of item');
            res.sendStatus(500);
          } else {
            console.log('not enough money');
            res.sendStatus(500);
          }
          // subtract qty from item
        }
      }); // end query
    } // end if
  }); // end pool
};

// subtract qty from item
function subtractQty(student, item, res, req){
  console.log('item', item);
  if(item.qty > 0){
    var newQty = item.qty - 1;
    console.log(newQty);
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'UPDATE items SET qty = $1 WHERE id = $2';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [newQty, item.id], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
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
  console.log('item', item);
  console.log('student', student);
  if (student.pts > item.pts_value) {
    var newPts = student.pts - item.pts_value;
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        cancelTransaction(student, item, res, req, 'item');
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'UPDATE users SET pts = $1 WHERE "id" = $2';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [newPts, student.id], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            cancelTransaction(student, item, res, req, 'item');
          } else {
            // create row on transactions table
            addTransaction(student, item, res, req)
            //res.send(result.rows);
          }
        }); // end query
      } // end if
    }); // end pool
  }
};

// create row on transactions table
function addTransaction(student, item, res, req){
  console.log('student', student);
  console.log('item', item);
  console.log('user', req.user);
  pool.connect(function(errorConnectingToDatabase, db, done){
    var today = new Date();
    console.log(today);
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      cancelTransaction(student, item, res, req, 'user');
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'INSERT INTO transactions ("studentId", "pts", "employeeId", "timestamp", "itemId", "type") ' +
      'VALUES ($, $2, $3, $4, $5, $6)';
      // errorMakingQuery is a bool, result is an object
      console.log(student.id, '-' + item.pts_value, req.user.id, today, item.id, 'sale');
      db.query(queryText, [student.id, '-' + item.pts_value, req.user.id, today, item.id, 'sale'],
        function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          cancelTransaction(student, item, res, req, 'user');
        } else {
          // Send back the results
          res.sendStatus(200);
          //res.send(result.rows);
        }
      }); // end query
    } // end if
  }); // end pool
};

function cancelTransaction(student, item, res, req, point) {
  console.log('transaction error', point);
  console.log('student', student);
  console.log('item', item);
  if(point == 'item'){
    console.log('error after qty was subtracted');
    addQty(student, item, res, req);
    // res.sendStatus(500);
  } else if (point == 'user') {
    console.log('error after qty and points were subtracted');
    addQty(student, item, res, req, addPoints);
    // res.sendStatus(500);
  }
}

function addQty(student, item, res, req, cb) {
  console.log('ITEM QTY', item.qty);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'UPDATE items SET qty = $1 WHERE id = $2';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [item.qty, item.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          //subrtact points from student
          if(cb) {
            cb(student, item, res, req);
          } else {
            res.sendStatus(500);
          }
        }
      }); // end query
    } // end if
  }); // end pool
}

function addPoints(student, item, res, req) {
  console.log('STUDENT POINTS', student.pts);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'UPDATE users SET pts = $1 WHERE "id" = $2';
      db.query(queryText, [student.pts, student.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(500);
        }
      }); // end query
    } // end if
  }); // end pool
}

module.exports = sellingModule;
