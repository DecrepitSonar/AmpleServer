const mongoose = require('mongoose')
const schema = mongoose.Schema


let trackSchema = new schema({
  id: {type:  String },
  type: {type: String},
  genre: {type: String},
  trackNum: {type: Number},
  title: {type: String},
  artistId: {type:  String },
  name: {type: String},
  imageURL: {type:  String },
  audioURL: {type:  String },
  albumId: {type: String},
  playCount: {type: Number},
  videoId: {type: String}
})
exports.Tracks = mongoose.model('Track', trackSchema)