const express = require('express')
const app = express()
var path = require('path');
const port = 8080
var ejsLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser')


var indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts);
app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
