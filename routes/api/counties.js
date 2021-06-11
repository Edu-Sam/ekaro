const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const counties = await prisma.county.findMany()

  res.json(counties)
})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const county = await prisma.county.findUnique({
            where:{id}
        })
        res.json(county)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
  })

app.post('/', async (req, res) => {
    try {
        const { countyCode, countyName } = req.body
        const county = await prisma.county.create({
            data: {
                countyCode, 
                countyName
            }
        })
        res.json(county)

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
    
})
  
app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { countyCode, countyName } = req.body
        const county = await prisma.county.update({
            where: { id },
            data: { countyCode, countyName },
        })
        res.json(county)
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const county = await prisma.county.delete({
        where: {
          id,
        },
      })
      res.json(county)
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;