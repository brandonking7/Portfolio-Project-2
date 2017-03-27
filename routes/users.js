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

    console.log(users);
    // res.send(users);
    res.render('users/index', {
      users: users,
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

module.exports = router;
