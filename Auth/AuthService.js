const mongoose = require("mongoose")
const uuid = require('uuid').v4
const { 
  User,
  Setting, 
  Account
} = require('../Models/Model')
// const Session = require("../Models/SessionModel.js")
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

let userSessionsSchema = new Schema({
    sessionToken: {type: String},
    userId: { type: String },
    loginHistory: {
      dateTime: {type: Date},
      userAgent: {type: String}
    }
  })

const Session = mongoose.model("Session", userSessionsSchema)

exports.initialize= async () =>{
  try{
    mongoose.connect(process.env.MDBURL , {useNewUrlParser: true})
    console.log('Connected to atlas')
  }
  catch( err ){
    console.log(err)
    return
  }
} 

exports.registerUser = async (data) => {

    // Check if User is Existing
    await User.findOne({where: {email: data.email}})
    .then( response => {
      if(response != null){
        throw 403
      }
      return response
    })

    try{

       // Has password 
       let pwHash = await bcrypt.hash(data.password, 10)
      // let pwHash = data.password

      // Create new user and add settings foreign key
      let user = await User.create({
        username: data.username, 
        email: data.email, 
      }).then( result => { return result })

       // Create settings
      let setting = await Setting.create({
        password: pwHash
      }).then( result => { return result })

      // Associate settings with user 
      await user.setSetting(setting)

      // Create Account Settings 
      let account = await Account.create({
        imageURL: "6c1d77a1851c78aa2894f8b7be3f7af4"
      }).then( result => { return result })

      // Associate Account with User's settings 
      await account.setSetting(setting)
      
      return user 
    }
    catch( err ){
      return "There was an error creating user"
    }

}
exports.authenticateUser = async (credentials) => {

    // Find User if exists -- throw error else
    let response = await  User.findOne({where: { email: credentials.email.toLowerCase() }, include: Setting})
    .then( user => { return user })
    .catch(err => { return err})

      let passVerification = bcrypt.compare(credentials.password, response.Setting.password, ( err, result) => {

        if( err ){ console.log( "error during validation" + err )}

        if( !result ){
          throw "Password not match"
        }

        return 
        
      })

      return response

}

// Get session token and validate 
exports.validateSessionToken = async ( req, id) => {
  
  const token = req.query.token 
  console.log( "token", token)
  if( token == undefined){

    let session = new Session
    session.sessionToken = uuid()
    session.userId = id
    session.loginHistory = {
      datetime: Date.now(),
      userAgent: req.get('user-agent')
    }

    session.save()

    return session.sessionToken
  }
    
  // Find token if exists -- thor error else
  let result = await Session.findOne({sessionToken: token})
  .then( result => {

    if( result == null){
      
      console.log( "token not found ")
      console.log( "creating new token")

      let session = new Session
      session.sessionToken = token
      session.userId = id
      session.loginHistory = {
        dateTime: Date(),
        userAgent: req.get('user-agent')
      }
  
      session.save()
  
      console.log("token created")
      console.log( session )

      return session.sessionToken
    }

    let response =  User.findOne({where: { id: result.userId}})
    .then( user => {  return user })
    .catch(err => { return err})

    return response
    
  })
  .catch( err => {
    console.log( err )
  })

  return result 
  
}

exports.logoutUser = async (req) => {

  let token = req.headers.xauth

}