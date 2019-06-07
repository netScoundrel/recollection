import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


import User from './models/user';
import Post from './models/post';

let config = require('config');
let options = { 
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
};


// Init App
const app = express();
const port = process.env.PORT || 5000;

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());


// mongodb connection
mongoose.connect("mongodb+srv://Allener:K7xAkLCP87DiUw8_@tripper-xnz5n.mongodb.net/test?retryWrites=true");

const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));


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
          //req.session.userId = user._id;
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
  let email = req.body.email;
  let password = req.body.password;

  if (email && password) {
    User.authenticate(email, password, (error, user) => {
      if (error || !user) {
        const err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }  else {
          
      
          const users = db.collection('users');

          users.find({email}).toArray((err, docs) => {
            let owner = docs[0];
            
            let token = jwt.sign({username: owner.username}, 'secret', {expiresIn: '24h'});
            res.json({
              success: true,
              message: 'successfully authenticated',
              token
            });
          })          
      }
    });

  } else {
      const err = new Error('Email and password are required.');
      err.status = 401;
      return next(err);
    }
});


//POST /post : -- creates the post
app.post('/api/post', (req, res, next) => {
  if(req.body.title && req.body.text && req.body.name){
    const username = req.body.name;
    res.statusCode = 201;

    const users = db.collection('users');
    users.find({username}).toArray((err, docs) => {
      let owner = docs[0];

      const posts = db.collection('posts');
      posts.find().sort({postId: -1}).limit(1).toArray((err, docs) => {
        let nextPostId;
        let lastPostId;
        try {
          lastPostId = docs[0].postId;
          nextPostId = (parseInt(lastPostId) + 1).toString();
        }
        catch{
          nextPostId = '0';
        }
        finally{
          Post.create({title: req.body.title, text: req.body.text, publishDate: new Date(), ownerId: owner.userId, postId: nextPostId});
        }
      })
    })
  } else {
    throw new Error('Fields are necessary!');
  }

  
  res.json({
    
  })
});

// POST /check-auth : --If spa was refreshed then checks if token is still valid.
app.post('/api/check-auth', (req, res, next) => {
  let token = req.body.token;
  jwt.verify(token, 'secret', (err, authDate) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        success: true,
        authDate
      })
    }
  })
});

// POST /fetch-posts : --Gets all posts from the database on page load.
app.post('/api/fetch-posts', (req, res, next) => {
  const posts = db.collection('posts');
  posts.find().sort({publishDate: -1}).toArray((err, docs) => {
    res.send(docs);
  })
});


app.listen(port, () => console.log(`Listening on port ${port}`));
