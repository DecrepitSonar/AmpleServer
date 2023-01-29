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
  password: { type: DataTypes.STRING,},
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
  }
},
{
  timestamps: false,
})

const AccountSettings = sequelize.define("AccountSettings",{
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
    },
},
{
  timestamps: true,
  createdAt: "AccountCreated",
  updatedAt: false
})

const PaymentSettings = sequelize.define("PaymentSettings",{
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
  timestamps: false,
})

const PostsCollection = sequelize.define("Posts", {
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

const SavedCollection = sequelize.define("Saves", {
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

const HistoryCollection = sequelize.define("History", {
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

// Model Association 
//------------------------------------------------------------
User.hasOne(AccountSettings, { foreignKey: "id" }) 
User.hasOne(PaymentSettings, { foreignKey: "id" })
User.hasOne(Subscriptions, { foreignKey: "id" })
Subscriptions.hasMany(User, { foreignKey: "id" })
User.hasOne(PostsCollection, { foreignKey: "id" })
User.hasOne(SavedCollection, { foreignKey: "id" })
User.hasOne(HistoryCollection, { foreignKey: "id" })
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
  artistId: {
    type:  DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  imageURL: {type:  DataTypes.STRING },
  audioURL: {type:  DataTypes.STRING },
  albumId: {
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  playCount: {type: DataTypes.INTEGER},
  videoId: {
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4}
},{
  timestamps: true,
  createdAt: "releaseDate",
  updatedAt: false
})

//-----------------------------------------------------------
Track.hasOne(User, {foreignKey: "artistId"})
PostsCollection.hasMany(Track, {foreignKey: "id"})
SavedCollection.hasMany(Track, {foreignKey: "id"})
HistoryCollection.hasMany(Track, {foreignKey: "id"})
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
  trackId: {
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4}
},{
  timestamps: true,
  createdAt: "releaseDate",
  updatedAt: false
})

//-----------------------------------------------------------
Video.hasOne(User, {foreignKey: "artistId"})
Video.hasOne(Track, {foreignKey: "trackId"})
PostsCollection.hasMany(Video, {foreignKey: "id"})
SavedCollection.hasMany(Video, {foreignKey: "id"})
HistoryCollection.hasMany(Video, {foreignKey: "id"})
Track.hasOne(Video,{foreignKey: "videoId"})
//-----------------------------------------------------------

const Album = sequelize.define("Album", {
  id: {
    type:  DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
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
Album.hasOne(User, {foreignKey: "id"})
Track.hasOne(Album, {foreignKey: "id"})
Album.hasMany(Track, {foreignKey: "albumId"})
PostsCollection.hasMany(Album, {foreignKey: "id"})
SavedCollection.hasMany(Album, {foreignKey: "id"})
HistoryCollection.hasMany(Album, {foreignKey: "id"})
//-----------------------------------------------------------
module.exports = {User, PostsCollection, SavedCollection, HistoryCollection}