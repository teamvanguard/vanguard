var pool = require('../modules/pool.js');

var awardingModule = {
  awardPoints: awardPoints
}

// NOTE Get route of all challenges
// find student in database
function findChallenges(student, challenge, res, req) {
  console.log('student', student);
  console.log('challenge', challenge);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'SELECT * FROM challenges WHERE "id" = $1';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [challenge.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // Send back the results
          var selectedStudent = result.rows[0];
          console.log('selectedStudent from db', selectedStudent);
          console.log(challenge);
          res.sendStatus(500);
        }
      }); // end query
    } // end if
  }); // end pool
};

// NOTE Post route for awarding points
// create row on transactions table
function addPointsTransaction(student, challenge, res, req){
  console.log('student', student);
  console.log('user', req.user);
  pool.connect(function(errorConnectingToDatabase, db, done){
    var today = new Date();
    console.log(today);
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
        for (var i = 0; i < student.id.length; i++) {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'INSERT INTO transactions ("studentId", "pts", "employee_id", "timestamp", "challenge_id", "type") ' +
      'VALUES ($1, $2, $3, $4, $5, $6)';
      // errorMakingQuery is a bool, result is an object
      console.log(student.id[i], '+' + challenge.pts_value, req.user.id, today, challenge.id, 'Points!');
      db.query(queryText, [student.id[i], '+' + challenge.pts_value, req.user.id, today, challenge.id, 'Points!'],
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
    } // end for-loop
    } // end if
  }); // end pool
};


function awardPoints(student, challenge, res, req){
  //get the item info from the database
  findItem(student, challenge, res, req);
};


module.exports = sellingModule;
