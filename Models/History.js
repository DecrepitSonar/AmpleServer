const mongoose = require('mongoose')
const schema = mongoose.Schema

let historySchema = new schema({
  id: {type: String},
  userId: {type: String},
  type: {type: String},
  genre: {type: String},
  title: {type: String},
  name: {type: String},
  imageURL: {type: String},
  audioURL: {type: String},
  albumId: {type: String},
  artistId: {type: String},
  timestamp: {type: Date}
})
exports.History = mongoose.model("history", historySchema)