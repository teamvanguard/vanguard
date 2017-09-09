var pool = require('../modules/pool.js');

var awardingModule = {
  awardPoints: function(student, challenge, res, req) {
    console.log('award points');
    //get the item info from the database
    findChallenge(student, challenge, res, req);
  }
}

// NOTE Get route of all challenges
// find student in database
function findChallenge(student, challenge, res, req) {
  console.log('student', student);
  console.log('challenge', challenge);
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'SELECT * FROM challenges WHERE "id" = $1';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [challenge.id], function(errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // Send back the results
          var selectedChallenge = result.rows[0];
          console.log('selectedStudent from db', selectedChallenge);
          console.log(challenge);
          findStudent(student, selectedChallenge, res, req)
        }
      }); // end query
    } // end if
  }); // end pool
};

function findStudent(student, challenge, res, req) {
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
          var selectedStudent = result.rows[0];
          addPointsTransaction(selectedStudent, challenge, res, req);
        }
      }); // end query
    } // end if
  }); // end pool
};

// NOTE Post route for awarding points
// create row on transactions table
function addPointsTransaction(student, challenge, res, req) {
  console.log('student', student);
  console.log('user', req.user);
  pool.connect(function(errorConnectingToDatabase, db, done) {
    var today = new Date();
    console.log(today);
    if (errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'INSERT INTO transactions ("student_id", "pts", "employee_id", "timestamp", "challenge_id", "type") ' +
          'VALUES ($1, $2, $3, $4, $5, $6)';
        // errorMakingQuery is a bool, result is an object
        console.log(student.id, challenge.pts_value, req.user.id, today, challenge.id, 'challenge');
        db.query(queryText, [student.id, challenge.pts_value, req.user.id, today, challenge.id, 'challenge'],
          function(errorMakingQuery, result) {
            done();
            if (errorMakingQuery) {
              console.log('Attempted to query with', queryText);
              console.log('Error making query');
              res.sendStatus(500);
            } else {
              // Send back the results
              addPoints(student, challenge, res, req);
              //res.send(result.rows);
            }
          }); // end query
    } // end if
  }); // end pool
};

// sets students points back to orginal ammout if there was an error
function addPoints(student, challenge, res, req) {
  // subtract cost of item from student points
  var newPts = student.pts + challenge.pts_value;
  var lifeTimePts = student.lifetime_pts + challenge.pts_value;
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'UPDATE users SET pts = $1, lifetime_pts = $2 WHERE "id" = $3; ';
      // uses points recieved from db
      db.query(queryText, [newPts, lifeTimePts, student.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          console.log('student pts added');
          removeStudent(student, challenge, res, req);
        }
      }); // end query
    } // end if
  }); // end pool
}

function removeStudent(student, challenge, res, req) {
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'DELETE FROM student_challenge WHERE "student_id" = $1 AND challenge_id = $2; ';
      // uses points recieved from db
      db.query(queryText, [student.id, challenge.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          console.log('student pts reset');
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
}

module.exports = awardingModule;
