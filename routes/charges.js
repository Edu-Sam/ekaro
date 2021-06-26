const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
//const autho = require('../utils/rolesMw')

app.get('/',async (req,res) => {
  const charges = await prisma.charge.findMany()
//  const schoolTypes = await prisma..findMany()
  try{
    res.render('charges',{layout: 'schoolLayout',title:'Create Charge',charges})
  }
  catch(error){
    res.status(400).send(error)
  }
})

app.post('/',async (req,res) => {
  try{
    const {group_name}=req.body
    const classType = await prisma.applyCharge.create({
        data: {
            groupName: group_name
        }
    })

    res.redirect('./charges')
  }

  catch (error) {
      console.log(error)
      res.status(500).send(error.message)
  }

})

module.exports = app
