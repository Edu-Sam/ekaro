const express = require('express');
const passport = require('passport')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

const auth = require('../utils/passportConfig')

app.get('/', auth.checkNotAuthenticated, (req, res) => {
    res.render('login', { title: 'eKaro', layout:'nolayout' });
  });

  app.post('/', auth.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
  }))  
  
  app.get('/logout', (req,res)=>{
      req.logOut()
      res.redirect('/admin/dashboard')
  })

module.exports = app;
