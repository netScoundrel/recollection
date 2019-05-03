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
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

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
      Post.create({title: req.body.title, text: req.body.text});
    } else {
      throw new Error('Fields are necessary!');
    }
    
    res.send(req.body);
  })
});


app.post('/api/fetch-posts', (req, res, next) => {
  const posts = db.collection('posts');
  posts.find().toArray((err, docs) => {
    res.send(docs);
  })
})









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