const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
    try {
        const schools = await prisma.school.findMany({
          include: {schoolDetails: true}
        })
        const schooltypes = await prisma.schoolType.findMany()
        const schoolOwnerships = await prisma.schoolOwnership.findMany()
        const contractTypes = await prisma.contractType.findMany()
        const counties = await prisma.county.findMany()




        res.render('school', { title: 'Schools', schools,schooltypes, schoolOwnerships,contractTypes,counties })

    } catch (error) {
        res.status(400).send(error)
    }

})

app.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const school = await prisma.school.findUnique({
            where:{id},
            include:{
                schoolDetails: true
            }
        })
        res.json(school)

    } catch (error) {
        res.status(400).send(error.message)
    }

  })

app.post('/', async (req, res) => {
    try {
        const { name, schoolCode, typeID, ownershipID,countyID, contractTypeID,contractValue,postalAddress, physicalAddress,county,subCounty, mpesaPaybill,bank,branch,contactPersonRole,contactPersonName,contactPersonPhone,contactPersonEmail,bankAccount } = req.body

        const school = await prisma.school.create({
            data: {
                name,
                schoolCode,
                type: {
                    connect: {id: parseInt(typeID)},
                  },
                ownership: {
                    connect: {id: parseInt(ownershipID)},
                  },
                county: {
                    connect: {id: parseInt(countyID)},
                  },
                contractType: {
                    connect: {id: parseInt(contractTypeID)},
                  },
                contractValue,
                schoolDetails: {
                    create: {
                        postalAddress,
                        physicalAddress,
                        county,
                        subCounty,
                        mpesaPaybill: parseInt(mpesaPaybill),
                        bank,
                        branch,
                        contactPersonRole,
                        contactPersonName,
                        contactPersonPhone,
                        contactPersonEmail,
                        bankAccount
                    }
                },
            }
        })
        res.redirect('/schools')


    } catch (error) {
        console.log(error)
        res.status(500).send(error.meta)
    }

})


app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, schoolCode, typeID, ownershipID,countyID, contractTypeID,contractValue,postalAddress, physicalAddress,county,subCounty, mpesaPaybill,bank,branch,contactPersonRole,contactPersonName,contactPersonPhone,contactPersonEmail,bankAccount } = req.body

        const school = await prisma.school.update({
            where: {id},
            data: {
                name,
                schoolCode,
                type: {
                    connect: {id: typeID},
                  },
                ownership: {
                    connect: {id: ownershipID},
                  },
                county: {
                    connect: {id: countyID},
                  },
                contractType: {
                    connect: {id: contractTypeID},
                  },
                contractValue,
                schoolDetails: {
                    create: {
                        postalAddress,
                        physicalAddress,
                        county,
                        subCounty,
                        mpesaPaybill,
                        bank,
                        branch,
                        contactPersonRole,
                        contactPersonName,
                        contactPersonPhone,
                        contactPersonEmail,
                        bankAccount
                    }
                },
            }
        })
        res.json(school)

    } catch (error) {
        res.status(500).send(error.message)
    }

})

app.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const school = await prisma.school.delete({
        where: {
          id,
        },
      })
      res.json(school)

  } catch (error) {
      res.send(error)
  }

})

module.exports = app;
