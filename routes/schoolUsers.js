const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const app = express()

app.get('/', async (req, res) => {
  const schoolUsers = await prisma.schoolUser.findMany()
  res.render('schoolUsers', { title: 'Users', schoolUsers })
})

app.post('/', async (req, res) => {
    try {
        const { fullName, email, phone,designation, password, schoolID, createdBy } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const schoolUser = await prisma.schoolUser.create({
            data: {
                fullName, 
                email, 
                phone, 
                designation,
                password:hashedPassword, 
                schoolID: parseInt(schoolID),
                createdBy
            }
        })
        res.redirect('/schoolUsers')

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
    
})
  
app.get('/edit/:id',async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id)
        const schoolUser = await prisma.schoolUser.findUnique({
            where:{id}
        })
        res.render('editSchoolUser', {title: 'Users', schoolUser: schoolUser})
        
    } catch (error) {
        res.status(400).send(error)
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { fullName, email, phone,designation ,createdBy } = req.body
        const schoolUser = await prisma.schoolUser.update({
            where: { id },
            data: { fullName, email, phone, designation, createdBy },
        })
        res.redirect('/schoolUsers')
        
    } catch (error) {
        res.status(500).send(error.message)
    }
  
})

app.get('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const schoolUser = await prisma.schoolUser.delete({
        where: {
          id,
        },
      })
      res.redirect('/schoolUsers')
      
  } catch (error) {
      res.send(error)
  }
  
})


module.exports = app;