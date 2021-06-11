const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const schoolTypes = await prisma.schoolType.findMany()
  res.json(schoolTypes)
})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const schoolTypes = await prisma.schoolType.findUnique({
            where:{id}
        })
        res.json(schoolTypes)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
  })

app.post('/', async (req, res) => {
    try {
        const { typeName, description } = req.body
        const schoolType = await prisma.schoolType.create({
            data: {
                typeName, 
                description
            }
        })
        res.json(schoolType)

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
    
})
  
app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { typeName, description } = req.body
        const schoolType = await prisma.schoolType.update({
            where: { id },
            data: { typeName, description },
        })
        res.json(schoolType)
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const schoolType = await prisma.schoolType.delete({
        where: {
          id,
        },
      })
      res.json(schoolType)
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;