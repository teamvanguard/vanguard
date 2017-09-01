var pool = require('../modules/pool.js');

var sellingModule = {
  sellItem: sellItem
}

//find item info in database
function findItem(student, item, res, req) {
  console.log('item', item);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'SELECT * FROM items WHERE id = $1;';
      // errorMakingQuery is a bool, result is an object
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
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'SELECT * FROM users WHERE "studentId" = $1';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [student.studentId], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // Send back the results
          var selectedStudent = result.rows[0];
          console.log('selectedStudent from db', selectedStudent);
          if (selectedStudent.pts > item.pts_value && item.qty > 0) {
            subtractQty(selectedStudent, item, res, req);
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
    var newQty  = item.qty - 1;
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
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'UPDATE users SET pts = $1 WHERE "studentId" = $2';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [newPts, student.studentId], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
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
  console.log(student);
  console.log(item);
  pool.connect(function(errorConnectingToDatabase, db, done){
    var today = new Date();
    console.log(today);
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'INSERT INTO transactions ("studentId", "pts", "employeeId", "timestamp", "itemId", "type") ' +
      'VALUES ($1, $2, $3, $4, $5, $6)';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [student.id, '-' + item.pts_value, req.user.id, today, item.id, 'sale'],
        function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // Send back the results
          res.sendStatus(200);
          //res.send(result.rows);
        }
      }); // end query
    } // end if
  }); // end pool
};

function sellItem(student, item, res, req){
  //get the item info from the database
  findItem(student, item, res, req);
};

module.exports = sellingModule;
