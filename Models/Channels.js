const mongoose = require('mongoose')
const schema = mongoose.Schema

let channelSchema = new schema({
  id: {type: String},
  name: {type: String},
  description: {type: String},
  imageURL: {type: String}
})

exports.Channels = mongoose.model("channel", channelSchema)