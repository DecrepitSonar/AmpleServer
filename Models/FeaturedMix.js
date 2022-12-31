const mongoose = require('mongoose')
const schema = mongoose.Schema

let featureMix = new schema({
  id: {type:  String },
  title: {type: String},
  type: {type: String},
  userId: {type: String},
  tracks: {type: [String]},
  imageURL: {type: String},
  isPrivate: {type: Boolean},
  datePosted: {type: Date},
  genre: {type: String}
})
exports.FeaturedMix = mongoose.model('feautredMix',featureMix)
