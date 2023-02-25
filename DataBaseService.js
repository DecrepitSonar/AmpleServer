const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const Sequelize = require("sequelize")

// const sequelize = new Sequelize('DecrepitSonar/Ample','DecrepitSonar','v2_3yVPb_jmVG4HBnytdKmwFfdVCuLxb',{
//   host: 'db.bit.io',
//   dialect: 'postgres',
//   port: 5432,
//   dialectOptions: {
//     ssl: true
//   },
// })

const sequelize = new Sequelize(process.env.PSQL_DB, process.env.PSQL_USER, process.env.PSQL_PW,{
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: false
  }
})

exports.sequelize = sequelize

exports.initialize = async () => {
  try{
   await sequelize.sync()
  }
  catch(err){
    console.log( err )
    return err
  }
}


// const { ProfileHeader, 
//         Section, 
//         AlbumSection,
//         TrackDetailHeader } = require("./Utils.js")

// const { Users  } = require('./Models/Users.js')
// const { Albums } = require('./Models/Albums.js')
// const { Tracks } = require("./Models/Tracks.js")
// const { Videos } = require("./Models/Videos.js")

// exports.initialize = async() => {
  // try {
    // mongoose.connect(process.env.MDBURL,
  // {useNewUrlParser:true})

  // let date = new Date()
  // console.log(date)

  // let userId = uuid.v4()

  // let user = new models.User
  // user.id = userId
  // user.username = "robert.299@hotmail.com"
  // user.password = "12341234"
  // user.email = "robert.299@hotmail.com"
  // user.joinDate = new Date()

  // // user.save()
  // return mongoose

  // getFile("FeaturedAlbums").map( item => {
  //   // console.log(item)
  //   let track = new models.Track
  //   track.id = item.id
  //   track.trackNum = item.trackNum
  //   track.genre = item.genre
  //   track.type = item.type
  //   track.title = item.title
  //   track.artistId = item.artistId
  //   track.name = item.name
  //   track.imageURL = item.imageURL
  //   track.audioURL = item.audioURL
  //   track.albumId = item.albumId
  //   track.playCount = getRandomNumber()


  //   let history = new models.History
  //   history.id = uuid.v4()
  //   history.userId = "4f975b33-4c28-4af8-8fda-bc1a58e13e56"
  //   history.type = item.type
  //   history.genre = item.genre
  //   history.title = item.title
  //   history.name = item.name
  //   history.imageURL = item.imageURL
  //   history.audioURL = item.audioURL
  //   history.albumId = item.albumId
  //   history.artistId = item.artistId
  //   history.timestamp = new Date()

  //   // history.save()
  //   // track.save()

  //   let artist = new models.Artist
  //   artist.id = item.id
  //   artist.type = item.type
  //   artist.name = item.name
  //   artist.imageURL = item.imageURL
  //   artist.isVerified = item.isVerified
  //   artist.joinDate = new Date()
  //   artist.subscribers = getRandomNumber()

  //   // artist.save()

  //   let albums = new models.Album
  //   albums.id = item.id
  //   albums.type = item.type
  //   albums.title = item.title
  //   albums.name = item.name
  //   albums.artistId = item.artistId
  //   albums.imageURL = item.imageURL
  //   albums.releaseDate = new Date()

  //   let featured = new models.Featured
  //   featured.id = item.id
  //   featured.type = item.type
  //   featured.title = item.title
  //   featured.artist = item.artist
  //   featured.imageURL = item.imageURL

    // featured.save()

    // albums.save()

    // track.save()
    // console.log(track)
  // })
  //   return "connected"
  // }
  // catch(error){
  //   throw error
  // } }

// // Page Data
// exports.GetTracksDetail = async(id) => {

//   console.log( id )
//  let section = []
//  let track = await Tracks.findOne({id: id})
//  .exec()
//  .then( data => { return data })
//  .catch( err => { console.log( err )})

//  console.log( track )
//  section.push( track )

//  let header = new TrackDetailHeader
//  header.id = uuid.v4()
//  header.type = track.type
//  header.title = track.title
//  header.name = track.name
//  header.imageURL = track.imageURL
//  header.albumId = track.albumId
//  header.audioURL = track.audioURL

//  let videoSection = new Section
//  videoSection.id = uuid.v4()
//  videoSection.type = "Videos"
//  videoSection.tagline = " Related Video"

//  let videos = await Videos.findOne({id: track.videoId})
//  .exec()
//  .then( data => {
//    console.log( data )
//    if( data != null){
//      videoSection.items.push( data )
//      return
//    }
//    return
//   })

//  videoSection.items.length > 0 ? header.items.push(videoSection): null

//  let relatedAlbum = new Section
//  relatedAlbum.id = uuid.v4()
//  relatedAlbum.type = "Album"
//  relatedAlbum.tagline = "Related Album"

//  let album = await Albums.findOne({id: track.albumId})
//  .exec()
//  .then( data => { return data })

//  relatedAlbum.items.push(album)
//  header.items.push( relatedAlbum)

//   return header}
// exports.GetAlbumDetail = async(id) => {

//   let album = await Albums.findOne({id: id})
//   .exec()
//   .then( data => {
//     if(data != null){
//       return data
//     }
//     else{ return }
//   })
//   .catch( err => { return err})

//   let artist = await Users.findOne({id: album.artistId})
//   .exec()
//   .then( data => {
//     if(data != null){
//       console.log( "artist", data)
//       return data
//     }
//     else{ return }
//   })
//   .catch( err => { return err})

//   let albumDetail = new AlbumSection
//   albumDetail.id = album.id
//   albumDetail.type = album.type
//   albumDetail.name = artist.username
//   albumDetail.artistImgURL = artist.imageURL
//   albumDetail.title = album.title
//   albumDetail.imageURL = album.imageURL
//   albumDetail.foreignId = artist.id
//   albumDetail.releaseDate = album.releaseDate

//   let trackSection = new Section
//   trackSection.id = uuid.v4()
//   trackSection.type = "Tracks"
//   trackSection.tagline = "Tracks"

//   let tracks = await Tracks.find({albumRefID: album.id})
//   .exec()
//   .then( data => {
//     trackSection.items = data
//     // console.log( data  )
//   })
//   .catch( err => { console.log( err )})
//   console.log(trackSection.items)

//   albumDetail.items.push(trackSection)

//   let videos = await Videos.find({albumId: id})
//   .exec()
//   .then( data => { return data })
//   .catch( err => { return err })

//   let videoSection = new Section
//   videoSection.id = uuid.v4()
//   videoSection.type = "Videos"
//   videoSection.tagline = "Related Videos"
//   videoSection.items = videos

//   videoSection.items.length > 0 ? albumDetail.items.push( videoSection) : null

//   let relatedAlbums = new Section
//   relatedAlbums.id = uuid.v4()
//   relatedAlbums.type = "Albums"
//   relatedAlbums.tagline = `Other Albums`
//   relatedAlbums.items = await Albums.find({artistId: artist.id, type: "Album"})
//   .exec()
//   .then( data => {
//     let albums = []
//     console.log( data )
//     if( data.length > 0 ){
//       data.forEach( item => {
//         if( item.id == id ){
//           return
//         }else{
//           albums.push( item )
//         }
//       })
//     }
//     console.log( "albums", albums)
//      return albums
//   })
//   .catch( err => { return [] })

//   relatedAlbums.items.length > 0 ? albumDetail.items.push( relatedAlbums) : null

//   let singlesSection = new Section
//   singlesSection.id = uuid.v4()
//   singlesSection.type = "Singles"
//   singlesSection.tagline = "Singles"
//   singlesSection.items = await Albums.find({artistId: artist.id, type: "Single"})
//   .exec()
//   .then( data => {

//     let singles = []

//     if( data.length > 0){
//       data.forEach(item => {
//         if(item.id == id){
//           return
//         }else{
//           singles.push( item )
//         }
//       });

//     }
//     console.log( "Singles: ", singles)

//     return singles
//   })
//   .catch( err => { return [] })

//   singlesSection.items.length > 0 ? albumDetail.items.push(singlesSection) : null

//   console.log( "AlbumDestial", albumDetail)

//   return albumDetail
// }
// exports.GetArtistProfile = async (id) => {

//   let header = new ProfileHeader
//   let topTracks = new Section
//   let newReleases = new Section
//   let albums = new Section
//   let singles = new Section
//   let videos = new Section

//   header.type = "Header"

//   console.log( id )
  
//   let artist = await Users.findOne({id: id})
//   .exec()
//   .then( data => { return data })
//   .catch( err => { return err })

//   console.log(artist);

//   header.name = artist.username
//   header.artistId = artist.id
//   header.imageURL = artist.imageURL
//   header.isVerified = true
//   header.joinDate = artist.joinDate
//   header.bio = artist.bio
//   header.subscribers = artist.followers.length

//   newReleases.type = "Albums"
//   newReleases.tagline = `Recent Release by ${header.name}`

//    newReleases.items = await Albums.find({referenceId: id, type: "Album"})
//   .limit(1)
//   .exec()
//   .then( data => {
//         return data
//   })
//   .catch( err => { return err})

//   newReleases.items.length > 0 ? header.items.push(newReleases) : null

//   topTracks.type = "Tracks"
//   topTracks.tagline = "Popular"

//   topTracks.items = await Tracks.find({referenceId: id})
//   .sort({playCount: -1})
//   .limit(5)
//   .exec()
//   .then( data => {
//     return data
//   })
//   .catch( err => { return err })

//   topTracks.items.length > 0 ? header.items.push(topTracks) : null

//   albums.id = uuid.v4()
//   albums.type = "Albums"
//   albums.tagline = "Albums"

//   albums.items = await Albums.find({referenceId: id, type: "Album"})
//   .exec()
//   .then ( data => {
//     return data
//   })

//   albums.items.length > 0 ? header.items.push(albums) : null
//   singles.type = "Singles"
//   singles.tagline = "One offs "
//   singles.items = await Albums.find({artistId: id, type: "Single"})
//   .exec()
//   .then( data => {
//     return data
//   })
//   .catch( err => { return err })

//   singles.items.length > 0 ? header.items.push( singles ) : null

//   videos.id = uuid.v4()
//   videos.tagline = "Music Videos"
//   videos.type = "Videos"
//   videos.items = await Videos.find({artistId: artist.id })
//   .exec()
//   .then( data => {
//     return data })

//   videos.items.length > 0 ? header.items.push( videos ) : null

//   console.log(header)
//   return header }

// exports.getChannel = async(id) => {

//   let channel = new Channel
//   console.log( id)
//   // Get channel by id
//   await Users.findOne({id: id})
//   .exec()
//   .then( data => {
//     channel.id = data.id 
//     channel.name = data.username
//     channel.description = data.bio
//     channel.imageURL = data.imageURL
//     return data
//   })

// //   // Get channel episodes
//   let episodes = await Episodes.find({channelId: channel.id})
//   .exec()
//   .then( data => {
//     // console.log( "Episods", data)
//     return data 
//   })
//   .catch( err => { console.log( err )})

//   // // add related videos for episodes
//   for( i in episodes){

//     let episode = new Episode

//     await Videos.findOne({referenceId: episodes[i].id})
//     .exec()
//     .then( data => {

//       episode.id = episodes[i].id
//       episode.name = episodes[i].name
//       episode.description = episodes[i].description
//       episode.contentURL = episodes[i].contentURL 
//       episode.channel = ""
//       episode.imageURL = "jbp"
//       episode.channelId = episodes[i].channelId
//       episode.views = episodes[i].views
//       episode.video = data

//       // console.log( episode )

//       channel.episodes.push( episode)

//     })
//   }
  
//   console.log( channel)

//     return channel
//   }
// exports.GetNewReleasesFromUserFollowing = async ( id ) => {
  
  
//   console.log( "1")

//   let user  = await Users.findOne({id: id})
//   .then( data => { return data })
//   .catch( err => { console.log( data )})

//   let newAlbums = []

//   user.following.forEach( async function ( item ){

//     console.log( item )

//     await models.Album.find({artistId: item.id})
//     .sort({releaseDate: -1})
//     .limit(1)
//     .exec()
//     .then( data => {
//       console.log(data)
//       if(data != null && data.length > 0){
//         newAlbums.push( data[0])
//         return
//       }
//       else { return }
//     })
//     .catch( err => { return err })

//   })

//   return newAlbums}

// // // User History
// exports.GetUserTrackHistory = async(id) => {

//   let history = await Users.find({id: id})
//   .exec()
//   .then( data => {
//     return data
//   })
//   .catch( err => { return err})

//   return history }
// exports.getAllTracksFromUserHistory = async(id) => {
//   let result = await Users.findOne({id: id})
//   .then( user => { return user.listeningHistory })
//   .catch( err => { console.log( err )})

//   return result }
// exports.getAllVideosFromUserHistory = async(id) => {
//   let result = await Users.findOne( {id: id})
//   .then( user => { return user.watchHistory }) 
//   .catch( err => console.log( err ))

//   return result }

// // // Search
// exports.SearchWithQuery = async(q) => {

//   let collection = []

//   let query = new RegExp(q)

//   await Tracks.find({title: {$regex: query, $options: "mx" }})
//   .then( data => {
//     // console.log(data);
//     if( data != null && data.length > 0){
//       // console.log(data);

//       // collection.push(data)
//       data.forEach( ( item ) => {
//         collection.push(item)
//       })

//       return
//     }
//     else{ return }
//   })
//   .catch( err => { return err })

//   await Albums.find({title: {$regex: query, $options: "mx"}})
//   .exec()
//   .then( data => {
//     if(data != null && data.length > 0){

//       data.forEach( item => {
//         collection.push(item)
//       })
//       return
//     }
//   })
//   .catch( err => { return err })

//   await Users.find({name: {$regex: query, $options: "mx"}})
//   .exec()
//   .then( data => {
//     if( data != null && data.length > 0){
//       data.forEach( item => {
//         collection.push(item)
//       })
//       return
//     }
//     else{ return }
//   })
//   .catch( err => { return err})

//   return collection }

// // User Actions
// // exports.PostSubscription = async (user, obj) => {}
// exports.checkIfFollowing = async (query) => {

//   let user = await Users.findOne({id: query.user })
//   .exec()
//   .then( result => {
//     if(result != null){
//       for( i in result.following ){
//         if( result.following[i].id == query.id){
//           return 200
//         }
//         else if( i == result.following.length){
//           return null
//         }
//       }
//     }
//   })
//   .catch( err => { console.log( err )})

//   return user }
// exports.getFollowing = async (query) => {
//   let result = await Users.findOne({id: query})
//   .exec()
//   .then( data => {
//     console.log( data.following)
//     return data.following
//   })

//   return result }
// exports.AddNewFollower = async (id, object) => {

//   let user = await User.findOne({id: id})
//   .then( result =>  {
//     return result
//   })
//   .catch( err => { console.log( err )})

//   // check if user following array is not empty and if user item exists
//   if( user.following.length > 0 ){

//     // for every user check if id matches
//     for (i in user.following){
//       if( user.following[i].id == object.id){
//         return 200
//       }

//       // if end of following array and no user found
//       else if( i == user.following.length -1){

//         user.following.push(object)

//         // update user item in collection
//         await Users.updateOne({id: id}, {$set: {"following": user.following} })
//         .exec()
//         .then( result => {
//           return 200
//         })
//         .catch( err => { console.log( err )})
//       }
//     }

//   }
//   else{

//     // Add user to following array
//     user.following.push(object)

//     console.log(user)

//     // Add update user following collection
//     await Users.updateOne({id: id}, {$set: {"following": user.following} })
//     .exec()
//     .then( result => {
//       return
//     })
//     .catch( err => { console.log( err )})

//     return 200
//   } }
// exports.UnfollowArtist = async (id, artistId) => {

//   console.log( artistId)

//   let user = await Users.findOne({id: id})
//   .exec()
//   .then( user => {
//     console.log(user)

//     for( i in user.following){
//       // console.log(user.following[i])
//       if( user.following[i].id == artistId){
//         user.following.splice(i,1)

//         return user
//       }
//       else if( i == user.following.length -1){
//         console.log("done")
//         return null
//       }
//     }
//   })
//   .catch( err => { console.log( err )})

//   console.log( user)

//   if( user != null){
//    let result = await Users.updateOne({id: id}, { $set: {"following": user.following}})
//    .exec()
//    .then( result => {
//      console.log( result)
//      return 200
//    })
//    .catch( err => {
//      console.log( err )
//    })

//    return result
//  } }

// exports.CheckIfAlbumSaved = async( query) => {

//   let result = await Users.findOne({id: query.userId})
//   .exec()
//   .then( result => {
//     if(result.albums.length > 0){

//       for( i in result.albums ){
//         if( result.albums[i].id == query.id){
//           return 200
//         }
//         else if( result.albums.length == i){
//           return 404
//         }
//       }

//     }
//     else {
//       return 404
//     }
//   })
//   .catch( err => { console.log( err )})

//   return result }
// exports.SaveAlbum = async (id, item) =>  {

//   let album = new models.SavedAlbum
//   album.id = item.id
//   album.userId = id
//   album.type = item.type
//   album.genre = item.genre
//   album.title = item.title
//   album.name = item.name
//   album.artistId = item.artistId
//   album.imageURL = item.imageURL
//   album.releaseDate = item.releaseDate

//   // make sure item doesnt already exist in collection

//   console.log(item.id)

//   let result = await Users.findOne({id: id})
//   .exec()
//   .then( result => {
//     if( result.albums.length > 0){

//       for( i in result.albums){
//         if( result.albums[i].id == item.id){
//           return 500
//         }
//         else if( i == result.albums.length -1 ){
//           result.albums.push(album)
//           return result
//         }
//       }
//     }
//     else{
//       result.albums.push(album)
//       return result
//     }
//   })
//   .catch( err => { console.log( err )})

//   console.log( result
//   )

//   if( result  != 500){
//     result = await Users.updateOne({id: id}, {$set: {albums: result.albums}})
//     .exec()
//     .then( result => { return 200 })
//     .catch( err => { console.log( err )})
//   }

//   return result }
// exports.RemoveAlbumFromSaved = async (id, item) => {

//     let result = await Users.findOne({id: id})
//     .exec()
//     .then( result => {
//       if( result.albums.length > 0 ){

//         for( i in result.albums ){
//           if( result.albums[i].id == item){
//             result.albums.splice(i, 1)
//             return result
//           }
//           else{ return 404}
//         }
//       }
//       else{ return 404}
//     })
//     .catch( err => { console.log( err )})

//     if( result != 404){
//       result = await Users.updateOne({id: id}, {$set: { albums: result.albums}})
//       .exec()
//       .then( result => { return 200})
//       .catch( err => { console.log( err )})
//     }
//     // let result = await models.SavedAlbum.deleteOne({"userId": id, "id": item})
//     // .exec()
//     // .then( result => {
//     //   return 200
//     // })
//     // .catch( err => { console.log( err )})

//     return result }
// exports.getAllUserSavedAlbums = async (user) => {
//   let result = await Users.findOne({id: user})
//   .then( data => {
//     return data.albums
//   })
//   console.log(result)
//   return result}
// exports.getAllUserSavedTracks = async (id) => {

//   let tracks = await Users.findOne({id: id})
//   .then( result => {
//     return result.saved
//   })
//   .catch( err => {
//     console.log( err )
//   })

//   return tracks }
// exports.getSavedTrack = async (id, userId ) => {

//   let result = await Users.findOne({id: userId})
//   .then( result => {
//     console.log(result.saved)
//   })
//   .catch( err => { console.log( err )})

//   return result}
// exports.saveTrack = async (id, item) => {

//   // console.log(item)
//   let result = await Users.findOne({id: id})
//   .exec()
//   .then( result => {

//     if( result.saved.length > 0 ){
//       for(i in result.saved ){
//         if( result.saved[i].id == item.id ){
//           return
//         }else{
//           result.saved.push(item)
//         }
//       }
//     }else{
//       result.saved.push(item)
//     }

//     return result
//   })

//   .catch( err => { console.log( err )})

//   console.log("result" ,result)
//   let saveResult = await Users.updateOne({id: id}, {$set: { saved: result.saved}})
//   .exec()
//   .then( success => {
//     return 200
//   })
//   .catch( err => { console.log( err )})


//   return result}
// exports.removeSavedTrack = async (id, item) => {}
// exports.getPlaylist = async( id, user) => {

//   console.log(user);
//   let result = await Users.findOne({id: user})
//   .then( response => {
//     for( i in response.playlists ){
//       if( response.playlists[i].id == id){
//         return response.playlists[i]
//       }
//     }
//   })
//   .catch( err => { console.log( err )})

//   return result }
// exports.getAllPlaylistsForUser = async( user ) => {
//   let result = await Users.find({id: user})
//   .exec()
//   .then( data => {
//     return data[0].playlists
//   })

//   return result }
// exports.AddItemSearchToHistory = async (item) => {}
// exports.GetTracksByAlbumId = async (id) => {

//   console.log(id)
//   let tracks = models.Track.find({albumId: id})
//   .exec()
//   .then( result => {
//     return result
//   })
//   .catch( err => {
//     console.log(err)
//   })

//   return tracks}
// exports.getTrendingVideos = async () => {

//   let videos = models.Videos.find()
//   .sort({views: -1 })
//   .limit(10)
//   .exec()
//   .then( data => {return data })
//   .catch( err => { return err })

//   return videos }


