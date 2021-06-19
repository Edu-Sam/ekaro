require('dotenv').config()
var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

var passportAuth = require('./utils/passportConfig')
//var passportAuth = require('./utils/passportAuth')
//process.on('warning', e => console.warn(e.stack));
//API Routes
var api = require('./routes/api')

//Importing the route files
var indexRouter = require('./routes/index');
var adminDashboardRouter = require('./routes/adminDashboard')
var schoolDashboardRouter = require('./routes/schoolDashboard')
var adminLoginRouter = require('./routes/adminUserLogin');
var schoolLoginRouter = require('./routes/schoolUsersLogin');
var schoolTypesRouter = require('./routes/schoolTypes')
var schoolOwnershipRouter = require('./routes/schoolownership')
var contractTypesRouter = require('./routes/contractTypes')
var countiesRouter = require('./routes/counties')
var schoolRouter = require('./routes/school')
var schoolUsersRouter = require('./routes/schoolUsers')
var AdminUsersRouter = require('./routes/adminUsers')
var classTypesRouter = require('./routes/classTypes')
var studentsRouter = require('./routes/students')
var newStudentsRouter=require('./routes/newStudents')
var paymentsRouter = require('./routes/payments')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())



//Routing the routes
app.get('/', passportAuth.checkAuthenticated, (req, res)=>{
  res.redirect('/school/dashboard')
})
app.get('/admin/portal', passportAuth.checkAuthenticated, (req, res)=>{
  res.redirect('/admin/dashboard')
})

app.use('/admin/dashboard', passportAuth.checkAuthenticated, adminDashboardRouter);
app.use('/school/dashboard', passportAuth.checkAuthenticated, schoolDashboardRouter);
app.use('/school/login', schoolLoginRouter);
app.use('/admin/login', adminLoginRouter);
app.use('/schoolTypes', passportAuth.checkAuthenticated, schoolTypesRouter);
app.use('/schoolownership', passportAuth.checkAuthenticated, schoolOwnershipRouter);
app.use('/contractTypes', passportAuth.checkAuthenticated, contractTypesRouter);
app.use('/counties', passportAuth.checkAuthenticated, countiesRouter);
app.use('/schools', passportAuth.checkAuthenticated,passportAuth.isAdminUser, schoolRouter);
app.use('/schoolUsers', passportAuth.checkAuthenticated, schoolUsersRouter);
app.use('/adminUsers', passportAuth.checkAuthenticated, AdminUsersRouter);
app.use('/classTypes', passportAuth.checkAuthenticated, classTypesRouter);
app.use('/students', studentsRouter);
app.use('./addStudent',newStudentsRouter);
//app.use('/students', passportAuth.checkAuthenticated, studentsRouter);
app.use('/payments', passportAuth.checkAuthenticated, paymentsRouter)

app.use('/api', api)



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
  res.render('error', {layout: 'nolayout'});
});





module.exports = app;
