const { 
  User, 
  Subscriptions, 
  Post, 
  SavedCollection, 
  HistoryCollection, 
  Setting, 
  Account
} = require('./Models/Users.js')

const uuid = require('uuid').v4()

// Authengication - User login Route ( username, password ) ->  user object : status 403
const bcrypt = require('bcrypt')
exports.registerUser = async (data) => {

    // Check if User is Existing
    User.findOne({where: {email: data.email}})
    .then( response => {
      // console.log( "user already exists ")
      return "user already exists"
    })

    try{
       // Has password 
       let pwHash = await bcrypt.hash(data.password, 10)

      // Create new user and add settings foreign key
      let user = await User.create({
        username: data.username, 
        email: data.email, 
      })
      .then( result => { return result })

       // Create settings
      let setting = await Setting.create({
        password: pwHash,
      })
      .then( result => { return result })

      // Associate settings with user 
      // await user.setSetting(setting)
      await user.setSetting(setting)

     
      // Create Account Settings 
      const account = await Account.create({
        imageURL: "6c1d77a1851c78aa2894f8b7be3f7af4"
      })
      .then( result => { return result })

      // // // Associate Account Settings with User's account 
      await setting.setAccount(account)

      // // Create user subscription 
      // let subscriptions = await Subscriptions.create({})
      // .then( result => { return result })

      // // Associate subscriptions with user
      //  await subscriptions.setUser(user)
      
      // await Settings.findOne({include: User})

      // // Create Saved Collection 
      // const saves = SavedCollection.create =
      // // Associate collection with User 
      // // Create History 
      // // Associate History with User 
      // // Create Subscriptions
      // // Associate subscriptions with user
      
      User.findOne({include: Setting})
      .then( result => { console.log( "user and setting", result)})
      

      return user 
    }
    catch( err ){
      console.log( err)
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