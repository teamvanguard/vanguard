var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');

router.post('/:id', function(req, res) {
  var timeStamp = new Date();
  if (req.isAuthenticated()) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    if (req.user.role == 4) {
      pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
          console.log('Error connecting to the database.');
          res.sendStatus(500);
        } else {
          // We connected to the database!!!
          // Now we're going to POST things to the db
          var queryText = 'INSERT INTO student_challenge ("studentId", "challengeId", pass, timestamp) VALUES ($1, $2, $3, $4 ); ';

          // errorMakingQuery is a bool, result is an object
          db.query(queryText, [req.user.id, req.params.id, 'true', timeStamp],
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

module.exports = router;
