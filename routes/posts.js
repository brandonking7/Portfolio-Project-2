var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user');
var Post = require('../models/post');
var authHelpers = require('../helpers/auth.js');

//Post Index Router
router.get('/', function indexPost(req, res) {
  User.findById(req.params.userId)
    .exec(function(err, user) {
      if(err) {console.log(err);}
      res.render('posts/index.hbs', {
        user: user
      });
    });
});

// EDIT

router.get('/:id/edit', function editPost(req, res) {
  User.findById(req.params.userId)
    .exec(function (err, user){
      if (err) { console.log(err); }
      const post = user.posts.id(req.params.id);

      res.render('posts/edit', {
        post: post,
        user: user
      });
    });
});

// UPDATE
router.put('/:id', function updatePost(req, res){
  User.findById(req.params.userId)
    .exec(function (err, user){
      if (err) { console.log(err); }
      const post = user.posts.id(req.params.id);

      post.name = req.body.name,
      post.description = req.body.description,
      user.save();

      res.render('posts/show', {
        post: post,
        user: user
      });
    });
});

// NEW

router.get('/new', function newPost(req, res){
  User.findById(req.params.userId)
    .exec(function (err, user){
      if (err) { console.log(err) }
      res.render('posts/new', {
        user: user
      });
    });
});

// CREATE

router.post('/', function createPost(req, res){
  User.findById(req.params.userId)
    .exec(function (err, user){
      if (err) { console.log(err); }

      const newPost = {

        name: req.body.name,
        description: req.body.description

      }

      user.posts.push(newPost)

      user.save(function (err) {
        if (err) console.log(err);
        console.log('Post created!')
      });

      res.redirect('/users')
    });
});

// SHOW

router.get('/:id', function showPost(req, res) {
  User.findById(req.params.userId)
    .exec(function (err, user){
      if (err) { console.log(err); }
      const post = user.posts.id(req.params.id);
      res.render('posts/show', {
        post: post,
        user: user
      });
    });
});


module.exports = router;
