const uuid = require('uuid')

exports.getRandomNumber = () =>  {
  let random = Math.random(1000000) * 1000000
  let num = Math.floor(random)
  return num }

exports.AlbumSection = function() {
  this.id = uuid.v4(),
  this.type = "",
  this.foreignId = "",
  this.name = "",
  this.title = "",
  this.artistImgURL = "",
  this.imageURL = "",
  this.items = [],
  this.releaseDate = "" }
exports.TrackDetailHeader = function(){
  this.id = ""
  this.type = ""
  this.title = ""
  this.name = ""
  this.artistId = ""
  this.imageURL = ""
  this.items = [] }
exports.Section = function(){
  this.id = uuid.v4()
  this.type = null
  this.tagline = null
  this.items = []
  this.videos = [] }
exports.Channel = function(){
  this.id = null
  this.name = null
  this.description = null
  this.episodes = []}

exports.Episode = function(){
  this.id = null
  this.name = null
  this.description = null
  this.contentURL = null
  this.channel = null
  this.imageURL = null
  this.views = null
  this.channelId = null
  this.video = null}

exports.ProfileHeader = function(){
  this.id = uuid.v4(),
  this.type = null
  this.name = null,
  this.artistId = null,
  this.imageURL = null,
  this.bio = null,
  this.joinDate = null,
  this.subscribers = null,
  this.isVerified = null,
  this.items = [] }

exports.getFile = (file) => {

  let data = fs.readFileSync(path.join(__dirname + "/data/" + file +".json"), (data, err) => {

    if( err ){
      console.log(err)
      return err
    }

    return data
  })
  return JSON.parse(data) }
exports.getRandom = (max) => { 
  return Math.floor(Math.random() * max) }