const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
   //console.log(req.user);
   res.render('adminDashboard', { title: 'eKaro Admin Dashboard', names: req.user.fullName })
})


module.exports = app