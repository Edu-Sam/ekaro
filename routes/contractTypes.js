const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const contractTypes = await prisma.contractType.findMany()

  res.render('contractTypes', { title: 'Contract Types', contractTypes })
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
        res.redirect('/contractTypes')
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
})
  
app.get('/edit/:id',async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id)
        const contractType = await prisma.contractType.findUnique({
            where:{id}
        })
        res.render('editContractType', {title: 'School Types', contractType: contractType})
        
    } catch (error) {
        res.status(400).send(error)
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { typeName, description } = req.body
        const contractType = await prisma.contractType.update({
            where: { id },
            data: { typeName, description },
        })
        res.redirect('/contractTypes')
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.get('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const contractType = await prisma.contractType.delete({
        where: {
          id,
        },
      })
      res.redirect('/contractTypes')
      
  } catch (error) {
      res.send(error)
  }
  
})


module.exports = app;