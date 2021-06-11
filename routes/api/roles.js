const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const roles = await prisma.role.findMany()
  res.json(roles)
})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const roles = await prisma.role.findUnique({
            where:{id}
        })
        res.json(roles)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
  })

app.post('/', async (req, res) => {
    try {
        const { name, description, userTypeID } = req.body
        const role = await prisma.role.create({
            data: {
                name, 
                description,
                userTypeID: parseInt(userTypeID)
            }
        })
        res.json(role)

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
    
})
  
app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, description, userTypeID } = req.body
        const role = await prisma.role.update({
            where: { id },
            data: { name, description, userTypeID: parseInt(userTypeID) },
        })
        res.json(role)
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const role = await prisma.role.delete({
        where: {
          id,
        },
      })
      res.json(role)
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;