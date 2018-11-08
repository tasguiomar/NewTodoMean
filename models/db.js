var mongoose = require( 'mongoose' );


var bookmarkSchema = new mongoose.Schema({
  link: {type: String},
  description: {type: String},
  created_at:{type:Date,default:Date.now},
  created_by:String
});
mongoose.model('Bookmark', bookmarkSchema,'bookmarks' );