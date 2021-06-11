const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const autho = require('../utils/rolesMw')

app.get('/', async (req, res) => {
    try {
        const students = await prisma.student.findMany()
        const classTypes = await prisma.classType.findMany()
            
        res.render('students', { layout: 'schoolLayout', title: 'Students', students, classTypes })
        
    } catch (error) {
        res.status(400).send(error)
    }
  
})

app.post('/', async (req, res) => {
    try {
        const { studentID, fullName, studentClassID,feeBalance, guardianName, guardianPhone } = req.body
        let schoolID = req.user.school.id
        const student = await prisma.student.create({
            data: {
                studentID, 
                fullName, 
                schoolID, 
                studentClassID: parseInt(studentClassID),
                feeBalance, 
                guardianName, 
                guardianPhone
            }
        })
        res.redirect('/students')

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
    
})

app.get('/edit/:id',async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id)
        const student = await prisma.student.findUnique({
            where:{id}
        })
        res.render('editstudent', {title: 'Students', student})
        
    } catch (error) {
        res.status(400).send(error)
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { studentID, fullName, studentClassID,feeBalance, guardianName, guardianPhone} = req.body
        const student = await prisma.student.update({
            where: { id },
            data: { studentID, fullName, studentClassID,feeBalance, guardianName, guardianPhone },
        })
        res.redirect('/students')
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.get('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const student = await prisma.student.delete({
        where: {
          id,
        },
      })
      res.redirect('/students')
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;