const mongoose = require('mongoose')
const schema = mongoose.Schema


let videoSchema = new schema({
  id: {type: String},
  videoURL: {type: String},
  posterURL: {type: String},
  title: {type: String},
  artist: {type: String},
  referenceId: {type: String},
  views: {type: Number},
  releaseDate: {type: Date},
  artistId: {type: String},
  type: {type: String},
})
exports.Videos = mongoose.model("Videos", videoSchema)