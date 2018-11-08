var mongoose = require('mongoose');
var User = mongoose.model('User');
var {check, validationResult} = require('express-validator/check');


exports.signup = function (req, res) {
 const errors = validationResult(req);
 if(!errors.isEmpty()){
   return res.status(422).send('User and password length min 5');
 }
  var newuser = new User();
  newuser.username = req.body.username;
  newuser.email = req.body.email;
  newuser.password = req.body.password;

  newuser.save(function (err, savedUser) {
    if (err) {
      res.status(400).send('Username or email exist');
    } else {
      res.status(201).send({
        "username": savedUser.username
      });
    }
  });
}

exports.login = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email
  }, function (err, user) {
    if (user == null) {
      res.status(400).end('No account with this email');
    } else {
      req.body.username = user.username;
      user.comparePassword(password, function (err, isMatch) {
        if (isMatch && isMatch == true) {
          next();
        } else {
          res.status(400).end('Invalid email or password');
        }
      });
    }
  });
}