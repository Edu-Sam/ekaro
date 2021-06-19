const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
//const autho = require('../utils/rolesMw')

app.get('/',async (req,res) => {
  try{
    res.render('newStudents',{layout: 'schoolLayout',title:'Add Student'})
  }
  catch(error){
    res.status(400).send(error)
  }
})

module.exports = app
