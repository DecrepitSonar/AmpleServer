const mongoose = require('mongoose')
const schema = mongoose.Schema

let showSchema = new schema({
  id: {type:  String },
  type: {type: String},
  title: {type: String},
  artistId: {type:  String },
  name: {type: String},
  imageURL: {type:  String },
  albumId: {type: String},
})
exports.Shows = mongoose.model('Show', showSchema)
