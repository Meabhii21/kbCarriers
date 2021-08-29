const dotenv = require('dotenv');
dotenv.config({path:'.env'});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Authorisation
const isAuth = require('./middleware/is-auth');

//Database
const sequelize = require('./utils/database');

//models

const Users = require('./models/users');
const Categories = require('./models/category');
const Items = require('./models/items');
const Orders = require('./models/order');

//routes

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const itemsRouter  = require('./routes/items');
const customerRouter = require('./routes/customer');
const adminRouter = require('./routes/admin');
const deliverRouter =  require('./routes/order');

var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // *.domain.com update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR"
  );
  res.header("Access-Control-Expose-Headers", "Token");

  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(isAuth);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categoryRouter);
app.use('/items',itemsRouter);
app.use('/customer',customerRouter);
app.use('/admin',adminRouter);
app.use('/deliver',deliverRouter);

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

//Relations

Categories.hasMany(Items);
Items.hasMany(Orders);
Users.hasMany(Orders);

// sequelize
//   .sync({ force: false })
//   //.sync()
//   .then((result) => {
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = app;