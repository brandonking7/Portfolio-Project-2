var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.promise = global.Promise;

var PostSchema = new Schema({
  name: String,
  description: String
});

var UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password_digest: String,
  created_at: Date,
  updated_at: Date,
  posts: [PostSchema],
  favorites: [PostSchema]
});

UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
      this.created_at = now;
  }
  next();
});

UserSchema.virtual('fullName').get(function () {
  return this.first_name + ' ' + this.last_name;
});

var UserModel = mongoose.model('User', UserSchema);
var PostModel = mongoose.model('Post', PostSchema);

module.exports = {
  User: UserModel,
  Post: PostModel
};
