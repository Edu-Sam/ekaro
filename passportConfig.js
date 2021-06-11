const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
//console.log('config file called')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email)
    if (user == null) {
        console.log('tuko null mazee');
      return done(null, false, { message: 'No user with that email' })
    }
        console.log('Bcrypt manenos');
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
        console.log('Bcrypt return error');
      return done(e)
    }
  }


  passport.use('schoolLocal', new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize