var chalk = require('chalk');
var mongoose = require( 'mongoose' );
var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR = 10;
require('dotenv').config()

/* .env */
//var dbURI = 'mongodb://localhost/NewTodoMean';
var dbURI =process.env.dbURI;



mongoose.Promise = global.Promise;
mongoose.connect(dbURI, { useMongoClient: true });

mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});

var userSchema = new mongoose.Schema({
  username: {type: String, unique:true},
  email: {type: String, unique:true},
  password: String,
  created_at:{type:Date,default:Date.now}
});



var bookmarkSchema = new mongoose.Schema({
  link: {type: String},
  description: {type: String},
  created_at:{type:Date,default:Date.now},
  created_by:String
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
mongoose.model('Bookmark', bookmarkSchema,'bookmarks' );
