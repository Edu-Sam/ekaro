const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const payments = await prisma.payment.findMany()
  res.json(payments)
})

app.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
      const payment = await prisma.payment.delete({
          where: {
            id,
          },
        })
        res.json(payment)
        
    } catch (error) {
        res.send(error)
    }
    
  })

module.exports = app