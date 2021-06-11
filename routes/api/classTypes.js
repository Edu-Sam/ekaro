const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const classTypes = await prisma.classType.findMany()

  res.json(classTypes)
})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const classType = await prisma.classType.findUnique({
            where:{id}
        })
        res.json(classType)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
  })

app.post('/', async (req, res) => {
    try {
        const { classNumber, name, schoolTypeID} = req.body
        const classType = await prisma.classType.create({
            data: {
                classNumber, name, schoolTypeID
            }
        })
        res.json(classType)

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
    
})
  
app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { classNumber, name, schoolTypeID } = req.body
        const classType = await prisma.classType.update({
            where: { id },
            data: { classNumber, name, schoolTypeID },
        })
        res.json(classType)
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const classType = await prisma.classType.delete({
        where: {
          id,
        },
      })
      res.json(classType)
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;