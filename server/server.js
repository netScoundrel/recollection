import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';
import session from 'express-session';
import connect_mongo from 'connect-mongo';
const MongoStore = connect_mongo(session);

import User from './models/user';
import Post from './models/post';


const app = express();
const port = process.env.PORT || 5000;

// mongodb connection
mongoose.connect("mongodb+srv://Allener:K7xAkLCP87DiUw8_@tripper-xnz5n.mongodb.net/test?retryWrites=true");

const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//// use sessions for tracking logins
app.use(session({
  secret: 'mysecretsshhh',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


app.post('/api/register', (req, res, next) => {
  if(req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.confirm) {
      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirm) {
        const err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }
      // create object with form input
      const userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      };
      // use schema's `create` method to insert document into Mongo
      User.create(userData, (error, user) => {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
        }
      });
    } else {
      const err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  res.send(
    `I received your POST request. This is what you sent me: Email: ${req.body.email} Password: ${req.body.password} Username: ${req.body.username}`,
);
});

// POST /login
app.post('/api/login', (req, res, next) => {
  let status;
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, (error, user) => {
      if (error || !user) {
        const err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }  else {

        req.session.userId = user._id;
        status = {isLoggedIn: true};

        // const ses = db.collection('sessions');
        // ses.find().toArray(function (err, docs) {
        //   console.log(docs);
        // });

        res.send(status);
        
      }
    });

  } else {

      var err = new Error('Email and password are required.');
      err.status = 401;
      return next(err);
    }


  app.post('/api/post', (req, res, next) => {
    if(req.body.title && req.body.text){
      res.statusCode = 201;
      Post.create({title: req.body.title, text: req.body.text, publishDate: new Date()});
    } else {
      throw new Error('Fields are necessary!');
    }
    
    res.send(req.body);
  })
});


app.post('/api/fetch-posts', (req, res, next) => {
  const posts = db.collection('posts');
  posts.find().sort({publishDate: -1}).toArray((err, docs) => {
    res.send(docs);
  })
});


// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });



app.listen(port, () => console.log(`Listening on port ${port}`));