const mongoose = require('mongoose')
const schema = mongoose.Schema

let featuredVideoSchema = new schema({
  id: {type: String},
  type: {type: String},
  title: {type: String},
  imageURL: {type: String},
  artist: {type: String},
  albumId: {type: String},
  views: {type: Number},
  releaseDate: {type: Date}
})

exports.FeaturedVideos = mongoose.model("featuredVideos", featuredVideoSchema)