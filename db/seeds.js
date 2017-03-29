var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfolio-project-2');

var User = require("../models/user");

mongoose.promise = global.Promise;

User.remove({}, function(err) {
    console.log(err);
});

// var girlFriend = new User({
//   first_name: 'Allison',
//   last_name: 'Gilmore',
//   username: 'FEFE!'
// });
// var mom = new User({
//   first_name: 'Vonda',
//   last_name: 'King',
//   username: 'Ma'
// });
//
// girlFriend.save(function(err){
//   if(err) console.log(err);
//
//   console.log('Wife created!')
// });
//
// mom.save(function(err){
//   if(err) console.log(err);
//
//   console.log('Mom created!');
// });
