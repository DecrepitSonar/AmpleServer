const mongoose = require('mongoose')
const schema = mongoose.Schema

// let artistInfoSchema = new schema({
//   genre: {type: String},
//   about: {type: String},
//   label: {type: String},
//   country: {type: String}
// })

// let artistSchema = new schema({
//   id: {type:  String },
//   type: {type: String},
//   name: {type: String},
//   imageURL: {type: String},
//   isVerified: {type: Boolean},
//   subscribers: {type: Number},
//   joinDate: {type: Date},
//   artistInfo: {type: artistInfoSchema}
// })

// exports.Artist = mongoose.model('Artist', artistSchema)

// let featuredVideoSchema = new schema({
//   id: {type: String},
//   type: {type: String},
//   title: {type: String},
//   imageURL: {type: String},
//   artist: {type: String},
//   albumId: {type: String},
//   views: {type: Number},
//   releaseDate: {type: Date}
// })

// exports.FeaturedVideos = mongoose.model("featuredVideos", featuredVideoSchema)

let userSchema = new schema({
  id: {type: String},
  username: {type: String},
  password: {type: String},
  email: {type: String},
  imageURL: {type: String },
  bio: {type: String },
  followers: {type: [String]},
  following: {type: [String]},
  joinDate: {type: Date},
  saved: {type: [String]},
  albums: {type: [String]},
  watchHistory: {type: [String]},
  listeningHistory:  {type: [String]},
  playlists: {type: [String]},
  savedVideos: {type: [String]}
})
exports.Users = mongoose.model('User', userSchema)
