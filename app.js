require('dotenv').config();
const bodyParser = require('body-parser');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db = require('./models');
db.sequelize.sync({ force: false });


var adminRouter = require('./routes/admin');
var authRouter = require('./routes/auth');
var initRouter = require('./routes/init');
var brandRouter = require('./routes/brands');
var categoryRouter = require('./routes/categories');
var productRouter = require('./routes/products');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/orders');
var roleRouter = require('./routes/roles');
var userRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var membershipsRouter = require('./routes/memberships');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/init', initRouter);
app.use('/brands', brandRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/roles', roleRouter);
app.use('/users', userRouter);
app.use('/search', searchRouter);
app.use('/memberships', membershipsRouter);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
