var mongoose = require('mongoose');
var Bookmark = mongoose.model('Bookmark');

exports.getBookmark = function (req, res) {
  Bookmark.findOne({
    "_id": req.params.id
  }, function (err, bookmark) {
    res.status(200).send(bookmark);
  });
}

exports.addBookmark = function (req, res) {
  var newBookmark = new Bookmark();
  newBookmark.link = req.body.link;
  newBookmark.description = req.body.description;
  newBookmark.created_by = req.body.created_by;

  newBookmark.save(function (err, savedBookmark) {
    if (err) {
      res.status(400).send('Error creating ToDo');
    } else {
      res.status(201).send('Erro');
    }
  });
}

exports.updateBookmark = function (req, res) {
  var id = req.params.id;
  Bookmark.findOne({
      "_id": id
    },

    function (err, bookmark) {
      if (err) {
        res.status(404).send("Error");
      } else {
        if (!bookmark) {
          res.status(404).send("Erro Todo " + id);
        } else {
          bookmark.link = req.body.link;
          bookmark.description = req.body.description;


          bookmark.save(function (err, updatedBookmark) {
            if (err) {
              res.status(500).send("Error ");
            } else {
              res.status(200).send(updatedBookmark);
            }
          });
        }
      }
    });
}


exports.getBookmarks = function (req, res) {
  Bookmark.find({
    "created_by": req.query.created_by
  }, function (err, bookmarks) {
    res.status(200).send(bookmarks);
  });
}



exports.deleteBookmark = function (req, res) {
  var id = req.params.id;
  Bookmark.findOneAndRemove({
      "_id": id
    },
    function (err) {
      if (err) {
        console.log("Error : " + err);
        return res.status(404).send("ToDo not found");
      }
      return res.status(200).send("ToDo deleted Successfully");
    });
}