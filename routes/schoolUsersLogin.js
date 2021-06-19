const express = require('express');
//var router = express.Router();
const passport = require('passport')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

const auth = require('../utils/passportConfig')

app.get('/', auth.checkNotAuthenticated, (req, res) => {
    res.render('schoolLogin', { title: 'eKaro', layout:'nolayout' });
  });

/*  app.post('/', auth.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/school/dashboard',
    failureRedirect: '/school/login',
    failureFlash: true
  }))*/
  app.post('/',(req,res)=>{
    res.render('schoolDashboard')
  })


  app.get('/logout', (req,res)=>{
      req.logOut()
      res.redirect('/school/dashboard')
  })

module.exports = app;
