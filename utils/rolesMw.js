

function isSuperUser(req,res,next) {
    if (req.user.userType.name == 'schoolUser' && req.user.role.name == 'Head Teacher'){
      let options = {
          layout: 'schoolLayout'
      }
      return next(options)
    }
 throw new Error('Dont know whatsup!')
  }


  module.exports = {
      isSuperUser
  }