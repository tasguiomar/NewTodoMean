var chalk = require('chalk');
var mongoose = require( 'mongoose' );
var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR = 10;
require('dotenv').config()

/* .env */
//var dbURI = 'mongodb://localhost/NewTodoMean';



var bookmarkSchema = new mongoose.Schema({
  link: {type: String},
  description: {type: String},
  created_at:{type:Date,default:Date.now},
  created_by:String
});

mongoose.model('Bookmark', bookmarkSchema,'bookmarks' );