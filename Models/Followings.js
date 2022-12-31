const mongoose = require('mongoose')
const schema = mongoose.Schema

let followingSchema = new schema({
  userId: {type: String},
  id: {type:  String },
  type: {type: String},
  name: {type: String},
  imageURL: {type: String},
  isVerified: {type: Boolean},
  subscribers: {type: Number},
  joinDate: {type: Date}
})
exports.Following = mongoose.model("Following", followingSchema)