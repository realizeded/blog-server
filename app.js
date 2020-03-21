var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const redisClient = require('./db/redis');
const redisStore = require('connect-redis')(session);
const fs = require('fs');

const sessionRedis = new redisStore({
  client:redisClient
});
let blogRouter = require('./routes/blog');
let userRouter = require('./routes/user');
var app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/
let NODE_ENV = process.env.NODE_ENV;
if(NODE_ENV!=='production') {
  app.use(logger('dev',{
    stream:process.stdout
  }));
} else {
  let accessLogFilePath = path.resolve(__dirname,'logs','access.log');
  const writeStream = fs.createWriteStream(accessLogFilePath,{
    flags:'a'
  });
  app.use(logger('combined',{
    stream:writeStream
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//处理session中简一件
app.use(session({
  secret: "ABCD!KSKPP[][][]``1$",
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge:24*60*60*1000
  },
  store:sessionRedis
}));
/*app.use(express.static(path.join(__dirname, 'public')));*/
app.use('/api/blog',blogRouter);
app.use('/api/user',userRouter);


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
  res.render('error');
});

module.exports = app;
