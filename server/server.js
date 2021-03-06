import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


import User from './models/user';
import Post from './models/post';

// Init App
const app = express();
const port = process.env.PORT || 5000;

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// mongodb connection
mongoose.connect("mongodb+srv://Allener:K7xAkLCP87DiUw8_@tripper-xnz5n.mongodb.net/recollection?retryWrites=true");

const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// POST /login
app.post('/api/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (email && password) {
    User.authenticate(email, password, (error, user) => {
      if (error || !user) {
        res.statusMessage = 'Wrong email or password';
        res.status(401).end();
      }  else {
          
          const users = db.collection('users');

          users.find({email}).toArray((err, docs) => {
            let owner = docs[0];
            
            let token = jwt.sign({username: owner.username}, 'secret', {expiresIn: '24h'});
            res.json({
              success: true,
              message: 'successfully authenticated',
              token,
              username: owner.username,
              userId: owner.userId,
              avatarId: owner.avatarId
            });
          })          
      }
    });

  } else {
      res.statusMessage = 'Email and password are required.';
      res.status(400).end();
    }
});

// POST /register
app.post('/api/register', (req, res, next) => {
  if(req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.confirm) {
      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirm) {
        res.statusMessage = 'passwords doesn\'t match';
        res.status(401).end();
      } else {
        const users = db.collection('users');
        const avatarId = Math.floor(Math.random() * 9) + 1;
        users.find().sort({userId: -1}).limit(1).toArray((err, docs) => {
          let nextId;
          let lastId;
          try {
            lastId = docs[0].userId;
            nextId = (parseInt(lastId) + 1).toString();
          }
          catch{
            nextId = "1";
          }
          finally{
            // create object with form input
            const userData = {
              userId: nextId,
              avatarId: avatarId,
              isAdmin: false,
              email: req.body.email,
              username: req.body.username,
              password: req.body.password,
            };
            // use schema's `create` method to insert document into Mongo
            User.create(userData);

              // check if db has this user already
            const users = db.collection('users');
            users.find({email: req.body.email}).toArray((err, doc) => {
              const user = doc[0];
              if ( user === undefined ) {
                res.send("User successfully created");
                res.status(200).end();
              } else {
                res.send("There is a user with this email already");
                res.status(401).end();
              }
            });
          }
        });
      }

      
    } else {
      res.statusMessage = 'All fields are required!';
      res.status(400).end();
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
          nextPostId = '1';
        }
        finally{
          Post.create({title: req.body.title, text: req.body.text, publishDate: new Date(), ownerId: owner.userId, postId: nextPostId, likes: {userId: []}});
        }
      })
    });
    res.statusMessage = 'Post created';
    res.status(200).end();
  } else {
    res.statusMessage = 'All fields are required';
    res.status(401).end();
  }
});

// POST /check-auth : --If spa was refreshed then checks if token is still valid.
app.post('/api/check-auth', (req, res) => {
  let token = req.body.token;
  jwt.verify(token, 'secret', (err, authDate) => {
    if(err) {
      res.status(403).end();
    } else {

      const users = db.collection('users');
      users.find({username: authDate.username}).toArray((err, doc) => {
        const user = doc[0];

        res.json({
          success: true,
          userId: user.userId,
          avatarId: user.avatarId,
          isAdmin: user.isAdmin,
          authDate
        })
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

//POST /delete-post : --Deletes post from database
app.post('/api/delete-post', (req, res, next) =>{
  const posts = db.collection('posts');
  const users = db.collection('users');

  posts.find({postId: req.body.id.toString()}).toArray((err, doc) => {
    const post = doc[0];
    users.find({username: req.body.username }).toArray((err, doc) => {
      const user = doc[0];

      //Checks if user is the owner of the post
      if (user.userId === post.ownerId ||user.isAdmin){
        posts.deleteOne({postId: req.body.id.toString()});
        res.send("Deleted");
      }
      else{
        res.send('Rejected');
      }
    })
  })
  
  
});

//POST /edit-post : --Edits chosen post in database
app.post('/api/edit-post', (req, res, next) =>{
  const posts = db.collection('posts');
  const users = db.collection('users');

  posts.find({postId: req.body.id.toString()}).toArray((err, doc) => {
    const post = doc[0];
    users.find({username: req.body.username }).toArray((err, doc) => {
      const user = doc[0];

      //Checks if user is the owner of the post
      if (user.userId === post.ownerId ||user.isAdmin){
        posts.findOneAndUpdate(
          {postId: req.body.id.toString()},
          {$inc: req.body.newData});
        res.send("Edited");
      }
      else{
        res.send("Rejected");
      }
    })
  })
});

app.post('/api/load-avatar', (req, res, next) => {
  const users = db.collection('users');
  users.find({userId: req.body.ownerId}).toArray((err, doc) => {
    const user = doc[0];

    res.json({
      avatarId: user.avatarId,
      username: user.username
    })
  })
});

app.post('/api/like', (req, res, next) => {
  const { postId, userId } = req.body;
  const posts = db.collection('posts');
  posts.find({postId}).toArray((err, doc) => {
    const post = doc[0];
    if(post.likes.userId.includes(userId)){  
      posts.findOneAndUpdate({postId}, { $set: {likes: {userId: post.likes.userId.filter(id => id !== userId)}}}, {}, () => {});
    } else {
      const newArray = post.likes.userId;
      newArray.push(userId);
      posts.findOneAndUpdate({postId}, { $set: {likes: {userId: newArray}}}, {}, () => {});
    }
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;