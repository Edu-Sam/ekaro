const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const classTypes = await prisma.classType.findMany()
  const schoolTypes = await prisma.schoolType.findMany()

  res.render('classTypes', { title: 'Class Types', classTypes, schoolTypes })
})

app.post('/', async (req, res) => {
    try {
        const { classNumber, name, schoolTypeID} = req.body
        const classType = await prisma.classType.create({
            data: {
                classNumber: parseInt(classNumber), name, schoolTypeID: parseInt(schoolTypeID)
            }
        })
        res.redirect('/classTypes')

    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }

})

app.get('/edit/:id',async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id)
        const classType = await prisma.classType.findUnique({
            where:{id}
        })
        res.render('editClassType', {title: 'classTypes', classType})

    } catch (error) {
        res.status(400).send(error.message)
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { classNumber, name, schoolTypeID } = req.body
        const classType = await prisma.classType.update({
            where: { id },
            data: { classNumber: parseInt(classNumber), name, schoolTypeID: parseInt(schoolTypeID) },
        })
        res.redirect('/classTypes')

    } catch (error) {
        res.status(500).send(error.message)
    }

})

app.get('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const classType = await prisma.classType.delete({
        where: {
          id,
        },
      })
      res.redirect('/classTypes')

  } catch (error) {
      res.send(error)
  }

})

module.exports = app;
