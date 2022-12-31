const mongoose = require('mongoose')
const schema = mongoose.Schema

let episodeSchema = new schema({
  id: {type: String},
  name: {type: String},
  description: {type: String},
  views: {type: String},
  contentURL: {type: String},
  channelId: {type: String},
  videoId: {type: String}
})

exports.Episodes = mongoose.model("episode", episodeSchema)