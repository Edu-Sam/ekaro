
const bcrypt = require('bcrypt')
var passport = require('passport')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const LocalStrategy = require('passport-local').Strategy


 const getUserByEmail = async (email)=>{
      const user = await prisma.user.findUnique({
          where:{email}
      })
      return user
  }

  const getUserById = async (id)=>{
    const user = await prisma.user.findUnique({
        where:{id},
        select: {
          id: true,
          fullName: true,
          email: true,
          userType:{
            select: {
              name: true
            }            
          },
          role: {
            select: {
              name: true
            }           
          },
          school: {
            select: {
              id: true,
              name: true
            }
          }
        },
    })
    return user
}


const authenticateUser = async (email, password, done) => {
  const user = await getUserByEmail(email)
  if (user == null) {
    return done(null, false, { message: 'No user with that email' })
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'Password incorrect' })
    }
  } catch (e) {
    return done(e)
  }
}

passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => {
    console.log('Just Serialized',user);
    done(null, user.id)})
  passport.deserializeUser(async (id, done) => {
    console.log('Deserializing User!!');
    const userbyID = await getUserById(id)
    return done(null, userbyID)
  })



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/school/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/school/dashboard')
    }
    next()
  }

  function isAdminUser(req,res,next) {
    if (req.user.userType.name != 'adminUser'){
      throw new Error('Access denied!: Not Authorized');

    }
    next()
  }

  function isSchoolUser(req,res,next) {
    if (req.user.userType.name != 'adminUser'){
      throw new Error('Access denied!: Not Authorized');

    }
    next()
  }


  module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    isAdminUser,
    isSchoolUser 
  }