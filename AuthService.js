
const { Users } = require('./Models/Users.js')

// Authengication - User login Route ( username, password ) ->  user object : status 403

exports.registerUser = async(username, password) => {}
exports.authenticate = async(credentials) => {
  console.log("Authenticating user...")
  // console.log(credentials.username.toLowerCase())
  console.log(credentials)
  console.log( credentials.username.toLowerCase())

  let response = await Users.findOne({username: credentials.username.toLowerCase()})
  .exec()
  .then( user => {
     return user 
    // if(user.password == credentials.password){
    //   return user
    // }else{
    //   return
    // }
  })
  .catch(err => {
    console.log( err )
    throw err
  })

  console.log( response )
  return response }