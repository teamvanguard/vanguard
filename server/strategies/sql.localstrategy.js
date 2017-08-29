var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
//new google strategy has to be required
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var encryptLib = require('../modules/encryption');
var pool = require('../modules/pool.js');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true
  },function(req, accessToken, refreshToken, profile, done){
      console.log("THIS IS THE PROFILE NAME", profile.displayName);
      console.log("THIS IS THE PROFILE EMAIL", profile.emails[0].value);
      console.log("THIS IS THE PROFILE PIC", profile.photos[0].value );
      pool.connect(function (err, client, release) {
        if(err) {
          console.log('connection err ', err);
          release();
          done(err);
        }
        var user = {};
        //adding user to database if not already there
        client.query("INSERT INTO users (username, name, email, pic) VALUES ($2,$1, $2, $3) ON CONFLICT (email) DO UPDATE SET username = $2, name = $1, email = $2, pic = $3",
        [profile.displayName, profile.emails[0].value, profile.photos[0].value ],
        function(err, result) {
        // Handle Errors
          if(err) {
            console.log('query err ', err);
            done(err);
            release();
          }
          //selecting the user from database and setting them as this session's user
          client.query("SELECT * FROM users WHERE username = $1",
          [profile.emails[0].value],
          function(err, result){
            if(err) {
              console.log('query err ', err);
              done(err);
              release();
            }
          user = result.rows[0];
          console.log("THIS IS THE USER: ", result)
          release();
          if(!user) {
              // user not found
              return done(null, false, {message: 'Incorrect credentials.'});
          } else {
            // user found
            console.log('User row ', user);
            done(null, user);
          }
        });

        });
      });
    } //end of function
)); //end of new GoogleStrategy

// ---------- normal passport-local below-------------- //
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('called deserializeUser - pg');

  pool.connect(function (err, client, release) {
    if(err) {
      console.log('connection err ', err);
      release();
      done(err);
    }
    var user = {};
    client.query("SELECT * FROM users WHERE id = $1", [id], function(err, result) {
    // Handle Errors
      if(err) {
        console.log('query err ', err);
        done(err);
        release();
      }
      user = result.rows[0];
      release();
      if(!user) {
          // user not found
          return done(null, false, {message: 'Incorrect credentials.'});
      } else {
        // user found
        console.log('User row ', user);
        done(null, user);
      }
    });
  });
});

// Does actual work of logging in
passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
    }, function(req, username, password, done) {
	    pool.connect(function (err, client, release) {
	    	console.log('called local - pg');
        // assumes the username will be unique, thus returning 1 or 0 results
        client.query("SELECT * FROM users WHERE username = $1", [username],
          function(err, result) {
            var user = {};
            console.log('here');
            // Handle Errors
            if (err) {
              console.log('connection err ', err);
              done(null, user);
            }
            release();
            if(result.rows[0] != undefined) {
              user = result.rows[0];
              console.log('User obj', user);
              // Hash and compare
              if(encryptLib.comparePassword(password, user.password)) {
                // all good!
                console.log('passwords match');
                done(null, user);
              } else {
                console.log('password does not match');
                done(null, false, {message: 'Incorrect credentials.'});
              }
            } else {
              console.log('no user');
              done(null, false);
            }
          });
	    });
    }
));

module.exports = passport;
