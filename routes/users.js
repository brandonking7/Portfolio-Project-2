var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  User.find({})
  .exec(function(err, users) {
    if(err) console.log(err);

    console.log(users);
    // res.send(users);
    res.render('users/index', {
      users: users
    });
  });
});

router.post('/', function(req, res,) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password_digest: res.hashedPassword
  });
  user.save(function(err user){
    if(err) console.log(err);
    console.log(user);
    res.redirect('/users');
  });
});

module.exports = router;
