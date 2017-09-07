var express = require('express');
var router = express.Router();
var constantModule  = require('../modules/roles.constants.js');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    if(req.user.role == constantModule.STUDENT_ROLE) {
      var userInfo = {
        username : req.user.username,
        pts: req.user.pts,
        student_id: req.user.student_id,
        pic: req.user.pic,
        lifetime_pts: req.user.lifetime_pts,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      };
    } else{
      var userInfo = {
        username : req.user.username,
        employeeid: req.user.student_id,
        pic: req.user.pic,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      };
    }
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});
// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});


module.exports = router;
