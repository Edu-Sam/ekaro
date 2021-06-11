const express = require('express')
const schoolTypesRoute = require('./schoolTypes')
const ownership = require('./schoolownership')
const counties =require('./counties')
const contractTypes =require('./contractTypes')
const school = require('./school')
const userTypes = require('./userTypes')
const users = require('./users')
const roles = require('./roles')
const classTypes = require('./classTypes')
const students = require('./students')
const paymentMethods = require('./paymentMethods')
const payments = require('./payments')
const stkPush = require('./stkpush')
const mpesaRaw = require('./mpesaraw')

const api = express()

api.use('/schoolTypes', schoolTypesRoute);
api.use('/ownership', ownership);
api.use('/counties', counties);
api.use('/contractTypes', contractTypes);
api.use('/schools', school)
api.use('/userTypes', userTypes)
api.use('/users', users)
api.use('/roles', roles)
api.use('/classTypes', classTypes)
api.use('/students', students)
api.use('/paymentMethods', paymentMethods)
api.use('/payments', payments)
api.use('/stk', stkPush)
api.use('/rawdata', mpesaRaw)



api.get('/',(req,res)=>{
    res.send('API Begins here!')
})

module.exports = api