var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
require('./models/db.js');
require('dotenv').config()

var user = require('./routes/user.js');
var bookmark = require('./routes/bookmark.js');

/* variavel no .env */
var jwtSecret = process.env.jwtSecret;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(expressJwt({
    secret: jwtSecret
}).unless({
    path: ['/', '/signup', '/login']
}));

app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname
    });
});

app.post('/signup', user.signup);
app.post('/login', user.login, function (req, res) {
    var token = jwt.sign({
        username: req.body.username
    }, jwtSecret);
    res.status(200).send({
        token: token,
        username: req.body.username
    });
});


app.get('/bookmark/:id', bookmark.getBookmark);
app.get('/bookmarks', bookmark.getBookmarks);
app.post('/bookmark', bookmark.addBookmark);
app.put('/bookmark/:id', bookmark.updateBookmark);
app.delete('/bookmark/:id', bookmark.deleteBookmark);


/* variavel configuração no .env */
var port = process.env.PORT;
app.listen(port, function (req, res) {
    console.log("Open http://localhost:" + port);
});