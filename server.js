const express = require('express');
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var User = require('./models/user');

const app = express();
const port = process.env.PORT || 5000;

// mongodb connection
mongoose.connect("mongodb+srv://Allener:K7xAkLCP87DiUw8_@tripper-xnz5n.mongodb.net/test?retryWrites=true");

const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// use sessions for tracking logins
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// make user ID available in templates
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/login', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: Email: ${req.body.email} Password: ${req.body.password}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));