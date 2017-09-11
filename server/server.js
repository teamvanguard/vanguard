require('dotenv').config(); //environment variable
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');

var itemsRouter = require('./routes/items.router');
var usersRouter = require('./routes/users.router');
var challengesRouter = require('./routes/challenge.router');
var studentsRouter = require('./routes/students.router');
var mailRouter = require('./routes/mail.router');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/items', itemsRouter);
app.use('/users', usersRouter);
app.use('/challenges', challengesRouter);
app.use('/students', studentsRouter);
app.use('/send', mailRouter)


// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
