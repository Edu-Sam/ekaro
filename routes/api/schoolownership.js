const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
    try {
        const ownershipTypes = await prisma.schoolOwnership.findMany()
        res.json(ownershipTypes)
        
    } catch (error) {
        res.status(400).send(error)
    }
  
})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const ownershipType = await prisma.schoolOwnership.findUnique({
            where:{id}
        })
        res.json(ownershipType)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
  })

app.post('/', async (req, res) => {
    try {
        const { typeName, description } = req.body
        const ownershipType = await prisma.schoolOwnership.create({
            data: {
                typeName, 
                description
            }
        })
        res.json(ownershipType)

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
    
})


app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { typeName, description } = req.body
        const ownershipType = await prisma.schoolOwnership.update({
            where: { id },
            data: { typeName, description },
        })
        res.json(ownershipType)
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const ownershipType = await prisma.schoolOwnership.delete({
        where: {
          id,
        },
      })
      res.json(ownershipType)
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;