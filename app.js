const express = require('express');
const path = require('path');
const app = express();

// routes
const postRoutes = require("./routes/post_routes.js")
const commentRoutes = require("./routes/comment_routes.js")

// db model user
const User = require('./models').user;

// EJS view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// parse body
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// add user to request
app.use((req, res, next) => {
    User.findOne().then((r) => {
        req.user = r
        next()
    }).catch((err) => {
        res.send(err.message)
    })
})

app.use("/web", [postRoutes, commentRoutes])

app.listen(3000);