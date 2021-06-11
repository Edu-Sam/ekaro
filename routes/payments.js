const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()


app.get('/',async (req,res)=>{
    const paymentMethods = await prisma.paymentMethod.findMany()
    res.render('receivePayment',{layout: 'schoolLayout', title: 'Payments', paymentMethods})
})

app.post('/validate',async (req,res)=>{
    let {studentID, amount, description, paymentMethodID, paymentRef,transactionDate} = req.body
    let payload = req.body
    try {
        const paymentMethod = await prisma.paymentMethod.findUnique({
            where:{
                id: parseInt(paymentMethodID)
            }
        })
        const student = await prisma.student.findFirst({
            where: {
                studentID,
                schoolID: req.user.school.id
            }
        })
        if (student == null) {
            return res.send('Invalid studentID')
        }
        if(paymentRef=='' && paymentMethod.name =='Cash'){
         paymentRef = paymentRefGenerator(studentID)
         payload.paymentRef = paymentRef
        }
        
        payload.paymentMethod = paymentMethod.name
        res.send({student,payload})
        
    } catch (error) {
        console.log(error)
    }
  
})


app.post('/postPayment', async(req, res)=>{
    const {studentID, amount, description, paymentMethodID, paymentRef, transactionDate} = req.body
    const paymentMethods = await prisma.paymentMethod.findMany()
    console.log(req.body);
    try {
        const payment = await prisma.payment.create({
            data:{
                studentID: parseInt(studentID),
                schoolID: req.user.school.id,
                paymentMethodID: parseInt(paymentMethodID) ,
                paymentRef,
                description,
                amount,
                transactionDate: new Date(transactionDate),
                servedByID: req.user.id,
                receiptNo: paymentRefGenerator(studentID)
            }
        })
        res.render('receivePayment',{layout: 'schoolLayout', title: 'Payments', payment, paymentMethods})
        
    } catch (error) {
        console.log(error);
    }
    
})

function paymentRefGenerator(studentID){ 
	let d = new Date() 
	let fdate = d.getFullYear()+''+((d.getMonth()>9)? d.getMonth(): '0'+d.getMonth()) +
				((d.getDate()>9)? d.getDate(): '0'+d.getDate()) +
				((d.getHours()>9)? d.getHours(): '0'+d.getHours()) +
				((d.getMinutes()>9)? d.getMinutes(): '0'+d.getMinutes()) +
				((d.getSeconds()>9)? d.getSeconds(): '0'+d.getSeconds()); 
	let payRef = fdate+'_'+studentID;

	return payRef
}

module.exports = app