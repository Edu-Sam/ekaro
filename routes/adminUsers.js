const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt  = require('bcrypt')
const app = express()

app.get('/', async (req, res) => {
  const adminUsers = await prisma.adminUser.findMany()
  res.render('adminUsers', { title: 'Users', adminUsers })
})

app.post('/', async (req, res) => {
    try {
        const { fullName, email, phone,designation, password } = req.body
        const createdBy = req.user.email
        const hashedPassword = await bcrypt.hash(password, 10)
        const adminUser = await prisma.adminUser.create({
            data: {
                fullName, 
                email, 
                phone, 
                designation,
                password:hashedPassword, 
                createdBy
            }
        })
        res.redirect('/adminUsers')

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
    
})
  
app.get('/edit/:id',async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id)
        const adminUser = await prisma.adminUser.findUnique({
            where:{id}
        })
        res.render('editAdminUser', {title: 'Users', adminUser: adminUser})
        
    } catch (error) {
        res.status(400).send(error)
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { fullName, email, phone,designation, password, createdBy } = req.body
        const adminUser = await prisma.adminUser.update({
            where: { id },
            data: { fullName, email, phone,designation, password, createdBy },
        })
        res.redirect('/adminUsers')
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.get('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const adminUser = await prisma.adminUser.delete({
        where: {
          id,
        },
      })
      res.redirect('/adminUsers')
      
  } catch (error) {
      res.send(error)
  }
  
})


module.exports = app;