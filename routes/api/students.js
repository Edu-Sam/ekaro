const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
    try {
        const students = await prisma.student.findMany()
        res.json(students)
        
    } catch (error) {
        res.status(400).send(error)
    }
  
})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const student = await prisma.student.findUnique({
            where:{id},
            
        })
        res.json(student)
        
    } catch (error) {
        res.status(400).send(error.message)
    }
    
  })

app.post('/', async (req, res) => {
    try {
        const { studentID, fullName, schoolID, studentClassID,feeBalance, guardianName, guardianPhone } = req.body
        console.log(req.body)
        const student = await prisma.student.create({
            data: {
                studentID, 
                fullName, 
                schoolID: parseInt(schoolID), 
                studentClassID: parseInt(studentClassID),
                feeBalance, 
                guardianName, 
                guardianPhone
            }
        })
        res.json(student)

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
    
})


app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {  studentID, fullName, schoolID, studentClassID,feeBalance, guardianName, guardianPhone} = req.body
        const student = await prisma.student.update({
            where: {id},
            data: {
                studentID, 
                fullName, 
                schoolID: parseInt(schoolID), 
                studentClassID: parseInt(studentClassID),
                feeBalance, 
                guardianName, 
                guardianPhone
            }
        })
        res.json(student)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
  
})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const student = await prisma.student.delete({
        where: {
          id,
        },
      })
      res.json(student)
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;