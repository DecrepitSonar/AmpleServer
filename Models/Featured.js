const mongoose = require('mongoose')
const schema = mongoose.Schema

let featuredSchema = new schema({
  id: {type: String},
  type: {type: String},
  title: {type: String},
  artist: {type: String},
  imageURL: {type: String},
  referenceId: {type: String}
})
exports.Featured = mongoose.model("feature", featuredSchema)