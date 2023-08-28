var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var artistsRouter = require('./routes/artists');
var songsRouter = require('./routes/songs');
var albumsRouter = require('./routes/albums');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/songs', songsRouter);
app.use('/albums', albumsRouter);

// const db = require('./database/models/index.js')

module.exports = app;


//TODO: add error handling middleware
//TODO: add logging middleware
//TODO: add authentication middleware
//TODO: add authorization middleware
//TODO: add validation middleware
//TODO: add unit tests
//TODO: pagination
//TODO: add caching
//TODO: add docker
//TODO: swagger

