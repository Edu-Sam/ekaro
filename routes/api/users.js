const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt  = require('bcrypt')
const app = express()

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const users = await prisma.user.findUnique({
            where:{id}
        })
        res.json(users)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
  })

app.post('/', async (req, res) => {
    try {
        const { fullName, email, phone,designation ,password, schoolID, createdBy, userTypeID, roleID } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                fullName, 
                email, 
                phone, 
                designation,
                password: hashedPassword, 
                schoolID,
                createdBy,
                userTypeID,
                roleID
            }
        })
        res.json(user)

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
    
})
  
app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { fullName, email, phone, password, schoolID, createdBy, userTypeID, roleID } = req.body
        const user = await prisma.user.update({
            where: { id },
            data: { fullName, email, phone, password, schoolID, createdBy, userTypeID, roleID },
        })
        res.json(user)
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const user = await prisma.user.delete({
        where: {
          id,
        },
      })
      res.json(user)
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;