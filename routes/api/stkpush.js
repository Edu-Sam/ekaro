const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const dates = require('date-format');
const fetch = require('node-fetch');
const app = express()

app.get('/', async (req, res) => {
  const payments = await prisma.sTKTransaction.findMany()
  res.json(payments)
})

app.post('/', async (req, res)=>{  
    const phoneNumber = req.body.phoneNumber
    const accountReference = req.body.accountReference
    const transactionDesc = req.body.transactionDesc
    const amount = req.body.amount
    const studentRegNo = req.body.studentRegNo
    const schoolID = req.body.schoolID
    const url = process.env.SAFCOM_STK_URL
    const CallBackURL = process.env.SAFCOM_STK_CALLBACK_URL
    const passKey = process.env.SAFCOM_STK_PASS_KEY
    let shortcode = process.env.SAFCOM_BUSINESS_SHORTCODE
    let timestamp = dates.asString('YYYYMMDDHHmmss', new Date())
    let createdOn = dates.asString(new Date())
    let password = Buffer.from(shortcode + passKey + timestamp).toString('base64')
    let credentials = process.env.SAFCOM_CONSUMER_KEY+':'+process.env.SAFCOM_CONSUMER_SECRET
    let encodedData = Buffer.from(credentials).toString('base64')
    let turl = process.env.SAFCOM_TOKEN_URL
    
    let body = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phoneNumber,
        "PartyB": shortcode,
        "PhoneNumber": phoneNumber,
        "CallBackURL": CallBackURL,
        "AccountReference": accountReference,
        "TransactionDesc": transactionDesc
    }

    try {
        const response = await fetch(turl, {headers: {"Authorization":"Basic "+encodedData} })    
        const json = await response.json()
        //console.log(json.access_token);

       const STK = await fetch(url, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + json.access_token  }
        })
        const respData = await STK.json()
        stkTrans = await prisma.sTKTransaction.create({
            data:{
                phoneNumber,
                studentRegNo,
                schoolID: parseInt(schoolID),
                amount,
                accountReference, 
                transactionDesc, 
                BusinessShortCode: shortcode, 
                MerchantRequestID: respData.MerchantRequestID, 
                CheckoutRequestID: respData.CheckoutRequestID,
                initResponseCode: respData.ResponseCode, 
                ResponseDescription: respData.ResponseDescription                                                              
            }
            })

        res.send(stkTrans)
        
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
})

app.post('/cb', async (req,res)=>{
    let cbPayload = req.body
   const cbResultCode = cbPayload.Body.stkCallback.ResultCode
   if (cbResultCode != 0) {
    try {
        const FailedTran = await prisma.sTKTransaction.update({
            where:{
                CheckoutRequestID: cbPayload.Body.stkCallback.CheckoutRequestID
                },
            data:{
                cbResultCode,
                cbResultDesc: cbPayload.Body.stkCallback.ResultDesc,
            }
        })
        return console.log(FailedTran);
    } catch (error) {
        console.log(error);
    }
   }
    try {
        const cb = await prisma.sTKTransaction.update({
            where:{
                CheckoutRequestID: cbPayload.Body.stkCallback.CheckoutRequestID
                },
            data:{
                cbResultCode,
                cbResultDesc: cbPayload.Body.stkCallback.ResultDesc,
                MpesaReceiptNumber: cbPayload.Body.stkCallback.CallbackMetadata.Item[1].Value,
                cbMetaData: cbPayload.Body.stkCallback.CallbackMetadata
            }
        })
        return console.log(cb);
    } catch (error) {
        console.log(error);
    }
})


app.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
      const payment = await prisma.sTKTransaction.delete({
          where: {
            id,
          },
        })
        res.json(payment)
        
    } catch (error) {
        res.send(error)
    }
    
  })

app.post('/safcb',async (req, res)=>{
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
        }
    
})  
module.exports = app