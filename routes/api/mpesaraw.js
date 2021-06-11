const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var dateFormat = require('date-format');
const app = express()

app.get('/', async (req,res)=>{
    const mpesaData = await prisma.rawMpesaData.findMany()
    res.send(mpesaData)
})

app.post('/',async (req, res)=>{
    //console.log(req.body);
    const {TransactionType,TransID,TransTime,TransAmount,BusinessShortCode,BillRefNumber,OrgAccountBalance,MSISDN,FirstName,MiddleName,LastName} = req.body
            try {
            const mpesaRaw = await prisma.rawMpesaData.create({
                data:{
                    TransactionType,
                    TransID,
                    TransTime,
                    TransAmount,
                    BusinessShortCode,
                    BillRefNumber,
                    OrgAccountBalance,
                    MSISDN,
                    payeeNames: FirstName+' '+MiddleName+' '+LastName
                }
            })
            console.log(mpesaRaw);
            res.json({ResultCode:0, ResultDesc:'OK'})
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    
})  

app.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
      const payment = await prisma.rawMpesaData.delete({
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