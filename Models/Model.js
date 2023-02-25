const { Sequelize, UUIDV4, DataTypes} = require("sequelize")
const {sequelize} = require('../DataBaseService.js')
const bcrypt = require('bcrypt')

const User = sequelize.define("User",{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4 
  },
  username: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  bio: { type: DataTypes.STRING },

},
{
  timestamps: false,
})

const Subscriptions = sequelize.define("Subscription",{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4 
  },
  Subscriptions: { type: DataTypes.ARRAY(DataTypes.UUID)},
},
{
  timestamps: true,
  createdAt: "subscriptionDate",
  updatedAt: false
})

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4 
  }
},
{
  timestamps: false,
})

const BookMark = sequelize.define("BookMark", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4 
  }
},
{
  timestamps: false,
})

const History = sequelize.define("History", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4 
  },
  userId: { type: DataTypes.UUID}
},
{
  timestamps: false,
})

const Setting = sequelize.define("Setting",{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  password: { type: DataTypes.STRING,},
},
{ 
  timestamps: true,
  createdAt: false,
  updatedAt: true
})

const Account = sequelize.define("Account",{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4 
  },
  imageURL: { type: DataTypes.STRING },
  subscribed: { 
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  Type: {
    type: DataTypes.STRING,
    defaultValue: "User"
  }},
{
  timestamps: true,
  createdAt: "AccountCreated",
  updatedAt: false
})

const PaymentCredential = sequelize.define("PaymentCredential", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4 
  },
  name: {type: DataTypes.STRING},
  address: {type: DataTypes.STRING},
  CCNum: {type: DataTypes.BIGINT},
  Pin: {type: DataTypes.INTEGER},
},
{
  timestamps: true,
  updatedAt: true,
  createdAt: false
})

// Model Association 
//------------------------------------------------------------
User.hasOne(Setting, { foreignKey: "UserId" }) 

Account.hasOne(Setting, { foreignKey: "AccountId" })

Subscriptions.hasOne(User, { foreignKey: "Subscriptions" })

History.hasOne(User,{foreignKey: "Histories"})

BookMark.hasMany(Post, {foreignKey: "postId"})

User.hasMany(Post, { as: "entity", foreignKey: "UserId" })

BookMark.hasOne(User, { foreignKey: "BookMarks" })

Post.hasMany(User, { foreignKey: "Posts" })

PaymentCredential.hasOne(User, { foreignKey: "paymentCredential"})

//-------------------------------------------------------------

const Track = sequelize.define("Track",{
  id: {
    type: DataTypes.UUID,
    primaryKey: true, 
    unique: true,
    defaultValue: DataTypes.UUIDV4
   },
  genre: {type: DataTypes.STRING},
  trackNum: {type: DataTypes.INTEGER},
  title: {type: DataTypes.STRING},
  HistoryCollection: { type:  DataTypes.UUID },
  imageURL: { type:  DataTypes.STRING },
  audioURL: { type:  DataTypes.STRING },
  albumId: {  type: DataTypes.UUID},
  playCount: { type: DataTypes.INTEGER},
  videoId: { type: DataTypes.UUID}
},{
  timestamps: true,
  createdAt: "releaseDate",
  updatedAt: false
})

//-----------------------------------------------------------
Track.hasOne(Post, {foreignKey: "trackId"})
Track.hasOne(BookMark, {foreignKey: "trackId"})
Track.hasOne(History, {foreignKey: "trackId"})
User.hasMany(Track, {foreignKey: "userId"})
//-----------------------------------------------------------

const Video = sequelize.define("Video",{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  contentURL: {type: DataTypes.STRING},
  posterURL: {type: DataTypes.STRING},
  title: {type: DataTypes.STRING},
  views: {type: DataTypes.INTEGER},
  artistId: {type: DataTypes.STRING},
  type: {type: DataTypes.STRING},
  trackId: {type: DataTypes.UUID}
},{
  timestamps: true,
  createdAt: "releaseDate",
  updatedAt: false
})

//-----------------------------------------------------------
Video.hasOne(Post, {foreignKey: "videoId"})
Video.hasOne(Track, {foreignKey: "videoId"})
Video.hasOne(BookMark, {foreignKey: "videoId"})
Video.hasOne(History, {foreignKey: "videoId"})
Track.hasOne(Video,{foreignKey: "trackId"})
User.hasMany(Video, {foreignKey: "userId"})

//-----------------------------------------------------------

const Album = sequelize.define("Album", {
  id: {
    primaryKey: true,
    type:  DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
   },
  genre: {type: DataTypes.STRING},
  title: {type: DataTypes.STRING},
  artistId: {type:  DataTypes.STRING,},
  imageURL: {type: DataTypes.STRING},
},
{
  timestamps: true,
  createdAt: "releaseDate",
  updatedAt: false
})

// //-----------------------------------------------------------
// Album.hasMany(Track, {foreignKey: "albumId"})
Track.hasOne(Album, {foreignKey: "trackId"})

Album.hasOne(Post, {foreignKey: "albumId"})
Album.hasMany(BookMark, {foreignKey: "albumId"})
Album.hasOne(History, {foreignKey: "albumId"})

User.hasMany(Album, {foreignKey: "userId"})
//-----------------------------------------------------------

// const Playlist = sequelize.define("Playlist", {
//   id: {
//     type: DataTypes.STRING,
//     primaryKey: true,
//     unique: true,
//     defaultValue: DataTypes.UUIDV4
//   },
//   name: { type: DataTypes.STRING },
//   imageURL: { type: DataTypes.STRING }
// },
// {
//   timestamps: true,
//   createdAt: "releaseDate",
//   updatedAt: false
// })

//-----------------------------------------------------------
// Track.hasMany(Playlist, {foreignKey: "trackId"})
// Track.hasMany(Video, {foreignKey: "videoId"})

// SavedCollection.hasMany(Playlist,{foreignKey: "playlistId"})
//-----------------------------------------------------------
module.exports = {
  User, 
  Post, 
  Setting,
  Account, 
  Subscriptions,
  BookMark, 
  History}