const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const contractTypes = await prisma.contractType.findMany()

  res.json(contractTypes)
})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const contractType = await prisma.contractType.findUnique({
            where:{id}
        })
        res.json(contractType)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
  })

app.post('/', async (req, res) => {
    try {
        const { typeName, description } = req.body
        const contractType = await prisma.contractType.create({
            data: {
                typeName, 
                description
            }
        })
        res.json(contractType)

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
    
})
  
app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { typeName, description } = req.body
        const contractType = await prisma.contractType.update({
            where: { id },
            data: { typeName, description },
        })
        res.json(contractType)
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const contractType = await prisma.contractType.delete({
        where: {
          id,
        },
      })
      res.json(contractType)
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;