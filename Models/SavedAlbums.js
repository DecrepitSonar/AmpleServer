const mongoose = require('mongoose')
const schema = mongoose.Schema


let savedAlbumSchema = new schema({
  userId: {type: String},
  id: {type:  String },
  type: {type: String},
  genre: {type: String},
  title: {type: String},
  name: {type: String},
  artistId: {type:  String},
  imageURL: {type: String},
  releaseDate: {type: Date}
})
exports.SavedAlbum = mongoose.model("SaveAlbum", savedAlbumSchema)