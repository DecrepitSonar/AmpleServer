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
  imageURL: { 
    type: DataTypes.STRING,
    defaultValue: 'profile' },
  headerPosterURL: {
    type: DataTypes.STRING,
    defaultValue: "istockphoto-1217205319-612x612"
  },
  username: { 
    type: DataTypes.STRING,
    required: true },
  email: { 
    type: DataTypes.STRING, 
    required: true },
  bio: { 
    type: DataTypes.STRING,
  defaultValue: "bio goes here" },
  subscriptionCount: { 
    type: DataTypes.INTEGER,
    defaultValue: 0},
  Type: {
    type: DataTypes.STRING,
    defaultValue: "User"
  }
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
  Subscriptions: { 
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: []},
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
  },
  user: { type: DataTypes.STRING},
  title: { type: DataTypes.STRING},
  posterURL: { type: DataTypes.STRING},
  catagory: { type: DataTypes.STRING},
  releaseDate:{ type: DataTypes.DATE},
  views: { type: DataTypes.INTEGER},
  contentURL: { type: DataTypes.STRING},
  userImageURL: { type: DataTypes.STRING},
  live: { type: DataTypes.BOOLEAN},
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
  password: { type: DataTypes.STRING},
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
  accountType: { 
    type: DataTypes.STRING,
    defaultValue: "basic"
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  name: {type: DataTypes.STRING,
    defaultValue: ""},
  address: {type: DataTypes.STRING,
    defaultValue: ''},
  CCNum: {type: DataTypes.BIGINT,
    defaultValue: 412341324123},
  Pin: {type: DataTypes.INTEGER,
    defaultValue: 123},
},
{
  timestamps: true,
  updatedAt: true,
  createdAt: false
})

// Model Association 
//------------------------------------------------------------
User.hasOne(Setting, { foreignKey: "UserId" }) 

User.hasOne(Account, { foreignKey: "UserId" })

Subscriptions.hasOne(User, { foreignKey: "Subscriptions" })

History.hasOne(User,{foreignKey: "Histories"})

BookMark.hasMany(Post, {foreignKey: "postId"})

User.hasMany(Post, { as: "entity", foreignKey: "UserId" })

BookMark.hasOne(User, { foreignKey: "BookMarks" })

Post.hasMany(User, { foreignKey: "Posts" })

PaymentCredential.hasOne(User, { foreignKey: "paymentCredential"})

//-------------------------------------------------------------

// const Track = sequelize.define("Track",{
//   id: {
//     type: DataTypes.UUID,
//     primaryKey: true, 
//     unique: true,
//     defaultValue: DataTypes.UUIDV4
//    },
//   genre: {type: DataTypes.STRING},
//   trackNum: {type: DataTypes.INTEGER},
//   title: {type: DataTypes.STRING},
//   HistoryCollection: { type:  DataTypes.UUID },
//   imageURL: { type:  DataTypes.STRING },
//   audioURL: { type:  DataTypes.STRING },
//   albumId: {  type: DataTypes.UUID},
//   playCount: { type: DataTypes.INTEGER},
//   videoId: { type: DataTypes.UUID}
// },{
//   timestamps: true,
//   createdAt: "releaseDate",
//   updatedAt: false
// })

// //-----------------------------------------------------------
// Track.hasOne(Post, {foreignKey: "trackId"})
// Track.hasOne(BookMark, {foreignKey: "trackId"})
// Track.hasOne(History, {foreignKey: "trackId"})
// User.hasMany(Track, {foreignKey: "userId"})
// //-----------------------------------------------------------

// const Video = sequelize.define("Video",{
//   id: {
//     type: DataTypes.UUID,
//     primaryKey: true,
//     unique: true,
//     defaultValue: DataTypes.UUIDV4
//   },
//   contentURL: {type: DataTypes.STRING},
//   posterURL: {type: DataTypes.STRING},
//   title: {type: DataTypes.STRING},
//   views: {type: DataTypes.INTEGER},
//   artistId: {type: DataTypes.STRING},
//   type: {type: DataTypes.STRING},
//   trackId: {type: DataTypes.UUID}
// },{
//   timestamps: true,
//   createdAt: "releaseDate",
//   updatedAt: false
// })

// //-----------------------------------------------------------
// Video.hasOne(Post, {foreignKey: "videoId"})
// Video.hasOne(Track, {foreignKey: "videoId"})
// Video.hasOne(BookMark, {foreignKey: "videoId"})
// Video.hasOne(History, {foreignKey: "videoId"})
// Track.hasOne(Video,{foreignKey: "trackId"})
// User.hasMany(Video, {foreignKey: "userId"})

// //-----------------------------------------------------------

// const Album = sequelize.define("Album", {
//   id: {
//     primaryKey: true,
//     type:  DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     unique: true,
//    },
//   genre: {type: DataTypes.STRING},
//   title: {type: DataTypes.STRING},
//   artistId: {type:  DataTypes.STRING,},
//   imageURL: {type: DataTypes.STRING},
// },
// {
//   timestamps: true,
//   createdAt: "releaseDate",
//   updatedAt: false
// })

// //-----------------------------------------------------------
// Album.hasMany(Track, {foreignKey: "albumId"})
// Track.hasOne(Album, {foreignKey: "trackId"})

// Album.hasOne(Post, {foreignKey: "albumId"})
// Album.hasMany(BookMark, {foreignKey: "albumId"})
// Album.hasOne(History, {foreignKey: "albumId"})

// User.hasMany(Album, {foreignKey: "userId"})
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