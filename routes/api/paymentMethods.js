const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const paymentMethods = await prisma.paymentMethod.findMany()
  res.json(paymentMethods)
})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const paymentMethods = await prisma.paymentMethod.findUnique({
            where:{id}
        })
        res.json(paymentMethods)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
  })

app.post('/', async (req, res) => {
    try {
        const { name, description } = req.body
        const paymentMethod = await prisma.paymentMethod.create({
            data: {
                name, 
                description
            }
        })
        res.json(paymentMethod)

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
    
})
  
app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, description } = req.body
        const paymentMethod = await prisma.paymentMethod.update({
            where: { id },
            data: { name, description },
        })
        res.json(paymentMethod)
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const paymentMethod = await prisma.paymentMethod.delete({
        where: {
          id,
        },
      })
      res.json(paymentMethod)
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;