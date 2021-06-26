const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
//const autho = require('../utils/rolesMw')

app.get('/',async (req,res) => {
  try{
    res.render('applyCharges',{layout: 'schoolLayout',title:'Create Charge'})
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
