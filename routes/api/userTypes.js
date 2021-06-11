const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const userTypes = await prisma.userType.findMany()
  res.json(userTypes)
})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const userTypes = await prisma.userType.findUnique({
            where:{id}
        })
        res.json(userTypes)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
  })

app.post('/', async (req, res) => {
    try {
        const { name, description } = req.body
        const userType = await prisma.userType.create({
            data: {
                name, 
                description
            }
        })
        res.json(userType)

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
    
})
  
app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, description } = req.body
        const userType = await prisma.userType.update({
            where: { id },
            data: { name, description },
        })
        res.json(userType)
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const userType = await prisma.userType.delete({
        where: {
          id,
        },
      })
      res.json(userType)
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;