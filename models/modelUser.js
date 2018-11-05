var mongoose = require( 'mongoose' );
var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR = 10;



var userSchema = new mongoose.Schema({
    username: {type: String, unique:true},
    email: {type: String, unique:true},
    password: String,
    created_at:{type:Date,default:Date.now}
  });

  userSchema.pre('save', function(next) {
      var user = this;
      if (!user.isModified('password')) return next();
  
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return next(err);
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) return next(err);
              user.password = hash;
              next();
          });
      });
  });
  
  userSchema.methods.comparePassword = function(candidatePassword, cb) {
      bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
          if (err) return cb(err);
          cb(null, isMatch);
      });
  };
  
  mongoose.model('User', userSchema,'users' );