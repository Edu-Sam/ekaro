const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
   console.log(req.user);
   res.render('schoolDashboard', { title: 'School Dashboard', layout: 'schoolLayout', user: req.user })
})


module.exports = app