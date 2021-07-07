const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
//const autho = require('../utils/rolesMw')

app.get('/',async (req,res) => {
  const charges = await prisma.charge.findMany()
  const appliedCharges=await prisma.chargeAppliesTo.findMany()
  const classType=await prisma.classType.findMany()
//  const schoolTypes = await prisma..findMany()
  try{
    res.render('charges',{layout: 'schoolLayout',title:'Charges Catalogue',charges,appliedCharges,classType})
  }
  catch(error){
    res.status(400).send(error)
  }
})

app.post('/addcharge',async (req,res) => {
  try{
    const {groupName}=req.body
    const applycharge = await prisma.chargeAppliesTo.create({
        data:{
            groupName: groupName
        }
    })

    res.redirect('/charges')
  }

  catch (error) {
      console.log(error)
      res.status(500).send(error.message)
  }

})

module.exports = app
