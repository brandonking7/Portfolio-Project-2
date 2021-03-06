var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authHelpers = require('../helpers/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  User.find({})
  .exec(function(err, users) {
    if(err) console.log(err);

    // var postsArray = []
    //
    // users.forEach {
    //   postsArray.push(user.posts)
    // }

    // postArray.sort by created_at
    // res.send(users);
    res.render('users/index', {
      users: users,
      // posts: postsArray,
      currentUser: req.session.currentUser
    });
  });
});

//SIGN UP: create a GET "/signup" that simply renders the signup page
router.get('/signup', function(req, res){
  res.render('users/signup.hbs');
});

//Edit User
router.get("/:id/edit", function(req, res) {
  User.findById(req.params.id)
    .exec(function(err, user) {
      if(err) {console.log(err);}
      res.render("users/edit", {
        user: user
      });
    });
});

//Updates Users Router/Info
router.put('/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email
  }, { new: true })
  .exec(function(err, user){
    if (err) { console.log(err); }
    console.log(user);
    res.render('users/show.hbs', {
      user: user

    });
  });
});

//SHOW: create a GET "/:id" route that shows the page ONLY IF it's the current user's session. Else, redirect to an error page that says "Oops! You are not authorized."
router.get("/:id", authHelpers.authorized, function(req, res) {
  User.findById(req.params.id)
    .exec(function(err, user) {
      if (err) { console.log(err); }
      res.render("users/show", {
        user: user,
        currentUser: req.session.currentUser

      });
    });
});

//User registration
//Auth stuff: POST "/" save username, email, and password
router.post('/', authHelpers.createSecure, function(req, res){
  var user = new User({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password_digest: res.hashedPassword

  });

  user.save(function(err, user){
    if (err) console.log(err);
    console.log(user);
    console.log(req.session.currentUser);
    res.redirect('/users');
  });
});

// USER DESTROY
router.delete('/:id', function(req, res){
  User.findByIdAndRemove(req.params.id)
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log('User deleted!');
    res.redirect('/users')
  });
});

module.exports = router;
