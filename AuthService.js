const { User } = require('./Models/Users.js')

// Authengication - User login Route ( username, password ) ->  user object : status 403
const bcrypt = require('bcrypt')
exports.registerUser = async (data) => {

    // Check if User is Existing
    User.findOne({where: {email: data.email}})
    .then( response => {
      console.log( "user already exists ")
      return 
    })

    //Create New user
    try{
      let pwHash = await bcrypt.hash(data.password, 10)
      let user = User.create({
        username: data.username, 
        password: pwHash,
        email: data.email
      })

      return user 
    }
    catch( err ){
      return "There was an error creating user"
    }

}
exports.authenticate = async (credentials) => {
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