
const express = require("express")
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


require("./db/mongoose") //ensure mongoose connects to the database


const userRouter = require('./routes/user');
const cameraRouter = require('./routes/camera');
const cameragroupRouter = require('./routes/cameragroup');
const deviceRouter = require('./routes/device');
const amsRouter = require('./routes/ams');
const loginRouter = require('./routes/login');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// Routes setup
app.use('/',loginRouter)
app.use('/users', userRouter)
app.use('/cameras', cameraRouter)
app.use('/cameragroups', cameragroupRouter)
app.use('/ams',amsRouter) // For accessing Azure media services 
app.use('/devices',deviceRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(res.locals.error);
});


module.exports = app;
