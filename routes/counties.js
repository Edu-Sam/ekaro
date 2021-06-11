const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
    console.log(req.user);
  const counties = await prisma.county.findMany()

  res.render('counties', { title: 'Counties', counties })
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
        res.redirect('/counties')

        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }
    
})
  
app.get('/edit/:id',async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id)
        const county = await prisma.county.findUnique({
            where:{id}
        })
        res.render('editCounty', {title: 'Counties', county})
        
    } catch (error) {
        res.status(400).send(error)
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { countyCode, countyName } = req.body
        const county = await prisma.county.update({
            where: { id },
            data: { countyCode, countyName },
        })
        res.redirect('/counties')
        
    } catch (error) {
        res.status(500).send(error)
    }
  
})

app.get('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const county = await prisma.county.delete({
        where: {
          id,
        },
      })
      res.redirect('/counties')
      
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = app;