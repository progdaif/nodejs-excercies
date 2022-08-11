/**
 * Express framework dispatcher
 */

const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const port = 8080;
const ejsLayouts = require("express-ejs-layouts");

app.use(methodOverride('_method'));

const indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts);
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use('/', indexRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
