var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;


var bookmarkSchema = new mongoose.Schema({
  link: {type: String},
  description: {type: String},
  created_at:{type:Date,default:Date.now},
  created_by: {type: Schema.Types.String, ref: 'users'}
});
mongoose.model('Bookmark', bookmarkSchema,'bookmarks' );