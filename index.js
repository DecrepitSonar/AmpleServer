
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const cors = require("cors")

require("dotenv").config();
 
// Services
const db = require('./DataBaseService.js')
const catalog = require('./CatalogService.js')
const auth = require('./Auth/AuthService.js')
const contentProvider = require("./StreamService.js")
const clientSessions = require('client-sessions')

const ValidateAuth = auth.validateSessionToken

app.set('port', 8000 )

app.use(express.static('public'))
app.use(bodyParser.urlencoded( {extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(clientSessions({
  cookieName: "session",
  secret: 'secret',
  duration: 2 * 60 * 1000,
  activeDuration: 1000 * 60 }))


app.use(function(req, res, next) { res.locals.session = req.session; next();});


app.post('/api/v1/auth/login', (req,res) => {

  // call autentication function and verify user
  console.log("loging in")
  auth.authenticateUser(req.body)
  .then((user) => {

    console.log( "user found")
    // check if user is provided
    if(user != undefined){

      console.log( "checking token")

      auth.validateSessionToken(req)
      .then( result => {
  
        console.log( "setting token")
        console.log( result )
        let data = user
        data.dataValues.apiKey = result

        res.json(data)
      })
      .catch( err => {
        throw err 
      })

    }else{
      res.status(403).send("User not found")
    }
  })
  .catch( err => {
    res.status(403).json({"message": err})
  })
})
 
// Register New User
app.post('/api/v1/auth/signup', (req,res) => {

  console.log( req.body)

  let user = auth.registerUser(req.body)
  .then( response => {
    // Return created user
    console.log("Created user")
    console.log( response)
    res.json(response) 
  })
  .catch( err => {
    switch(err){
      case 403: 
        console.log("User already Exists")
        res.status(403).send( "User already exists")
      break
      default: 
        // Something went wrong Internally
        console.log("Something went wrong internally")
        res.status(500).send(err)
    }
  })

})

app.get( '/api/v1/live', (req,res) => {

  if( req.query.id == undefined){
    fs.readFile(path.join(__dirname + "/Data/Videos.json"), ( err, data ) => {
      if( err ) return 
      res.status(200).json( JSON.parse(data ))
    })
  }
})

app.post("/", (req,res) => {
  console.log(req.body)
})

// Libary - Rout -> library object containing content sections and array of content
// // app.get('/api/v1/library', (req, res) => {
//   console.log(req.query)
//   catalog.GetUserLibraryData(req.query.user)
//   .then( data => {
//     res.json(data)
//   })
//   .catch( err => {
//     console.log( err )
//     res.sendStatus(500)
//   }) })

// Home - Rout -> Home sections object using userId
app.get("/api/v1/home", (req,res) => {

  console.log(req.query)
  catalog.GetUserHomeData(req.query.user)
  .then( data => {
    console.log( data )
    res.json(data)
  })
  .catch( err => {
    console.log(err)
  }) })

// Album - Route -> Album object using album object idea
app.get('/api/v1/album', (req,res) => {

  db.GetAlbumDetail(req.query.albumId)
  .then(data => { res.json(data) })
  .catch( err => { console.log(err) }) })

// Playlist - Route -> Playlists object using userid
app.get('/api/v1/playlists', (req,res) => {
  let playlists = getFile("Playlists")

  res.json(playlists) })

// Track -> Route -> Track object using trackId
app.get('/api/v1/track', (req,res) => {

  let keys = Object.keys(req.query)
  console.log(keys)

  switch(keys.toString()){
    case "isRandom":

    console.log("is random")
      contentProvider.getRandomAudio()
      .then( data => {
        res.json(data)
        console.log(data)
      })
      .catch( err => { console.log(err) })
      break
    case "id":
    // console.log(req.query.id)
      contentProvider.GetTrackById(req.query.id)
      .then( data => {
        // console.log(data)
        res.json(data)
      })
      .catch( err => {
        console.log(err)
      })
      break
    case "albumId":

    contentProvider.GetTracksByAlbumId(req.query.albumId)
    .then( data => {
      res.json(data)
    })
    .catch( err => {
      console.log( err )
      res.sendStatus(500)
    })
    break
    default:
    console.log( "Track")
    db.GetTracksDetail(req.query.trackId)
    .then( data => {
      res.json( data )
    })
    .catch( err => {
      console.log(err)
    })
    break
  } })

// Artist -> Route -> Artist object using artist id
app.get('/api/v1/artist', (req,res) => {
  console.log(req.query.id)
  db.GetArtistProfile(req.query.id)
  .then( data => {
    // console.log(data)
    res.json(data)
  })
  .catch( err => {
    console.log(err)
  }) })

// Seatch -> Route -> Search result object using search query param
app.get('/api/v1/search', (req,res) => {
  db.SearchWithQuery(req.query.q)
  .then( data => {
    res.json(data)
  })
  .catch( err => {
    console.log(err)
    res.sendStatus(404)
  }) })

// User Track History -> Route -> History object containing user listenting history using userid
app.get('/api/v1/history/user/:id/', (req,res) => {

  console.log( req.params.id)
  console.log( req.query.type)

  // let keys = Object.keys(req.query).toString()
  // console.log(keys)
  // console.log( keys.toString(keys))

  switch( req.query.type ){

    case "track":

      console.log( "getting tracks from user history")

      db.getAllTracksFromUserHistory(req.params.id)
      .then( result => { res.json( result )})
      .catch( err => { console.log( err )})

    break;

    case "video":

      db.getAllVideosFromUserHistory(req.params.id)
      .then( result => { res.json(result ) })
      .catch( err => { console.log( err )})

    break;

    default: res.sendStatus(404)

  } })

// Following / subscriptions - Route (objecId)-> Object  : status 404
app.get('/api/v1/user/subscriptions', (req,res) => {

  db.checkIfFollowing(req.query)
  .then( data => {
    if( data != null){
      res.sendStatus(data)
    }
    else{
      res.sendStatus(404)
    }
  })
  .catch( err => {
    res.sendStatus(err)
  }) })

// Saved / Albums -> Track object
app.get('/api/v1/user/saved', (req,res) => {
  // res.sendStatus(200)
  db.CheckIfAlbumSaved(req.query)
  .then( result => {
    res.sendStatus(result)
  })
  .catch( err => {
    res.sendStatus(500)
  }) })

// Saved Tacks -> Tracks Array
app.get('/api/v1/user/savedTracks', (req,res) => {

  let keys = Object.keys(req.query)

  switch(keys){

    case "track":
      db.getSavedTrack(req.query.id, req.query.user)
      .then( result => {
        return result
        res.sendStatus(200)
      })
      .catch( err => { console.log( err )})

    break;

    default:

    db.getAllUserSavedTracks(req.query.user)
    .then( result => {
      res.json( result )
    })
    .catch( err => {
      console.log( err )
    })
  } })

// Playlist -> Playlist Object with id query
app.get('/api/v1/user/playlist', (req,res) => {

  if(req.query.id){
    db.getPlaylist(req.query.id, req.query.user)
    .then( response => {
      res.json(response)
    })
    .catch( err => {
      res.sendStatus(err)
    }) }

  else{
    db.getAllPlaylistsForUser(req.query.user)
    .then( result => {
      console.log("playlist")
      res.json(result)
    })
    .catch( err => console.log( err ))
  } })

// Albums -> Saved Albums from user with user id
app.get('/api/v1/user/albums', (req,res) => {
  db.getAllUserSavedAlbums(req.query.user)
  .then( result => {
    res.json( result )
  }) })

// Following -> object from users following with id
app.get('/api/v1/user/following', (req, res) => {

  db.getFollowing(req.query.user)
  .then( result => {
    console.log(result)
    res.json(result)
  })
  .catch(error => {

  }) })

// app.get("/api/v1/audio", (req,res) => {
//   // console.log(req.query.audio)
//   audioBucket.Key = req.query.audio
//   console.log(audioBucket)

//   s3Client.getObject(audioBucket, function(err, data) {
//      if (err) console.log(err, err.stack); // an error occurred
//      else     console.log(data);           // successful response
//      /*
//      data = {
//       AcceptRanges: "bytes",
//       ContentLength: 3191,
//       ContentType: "image/jpeg",
//       ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
//       LastModified: <Date Representation>,
//       Metadata: {
//       },
//       TagCount: 2,
//       VersionId: "null"
//      }
//      */
//    });

//   // run(audioBucket)
//   // .then(( data => {
//     // res.sendStatus(200)
//   // }))
//   })

// Trending -> Trending Tracks
app.get('/api/v1/trending', (req,res) => {
  catalog.getTrendingTracks()
  .then( data => res.json(data))
  .catch( err => console.log( err )) })

// Channel -> channel object with provided id
app.get("/api/v1/channel", (req,res ) => {

  catalog.getChannel(req.query.id)
  .then( data => {
    res.json(data)
  })
  .catch( err => {console.log( err )})
 })

// Releases -> Releases of followed artists form user
app.get("/api/v1/home/releases", (req,res) => {

   db.getAllUserSavedAlbums(req.query.user)
      .then( data => { res.json(data)})
      .catch( err => console.log( err ))

  })

// VideoRoute
// app.get('/api/v1/video', (req,res) => { })
// app.get('/api/v1/videos', (req,res) => {

//   let keys = Object.keys(req.query)

//   console.log("keys:", keys)

//   switch( keys.toString()){
//     case "album":
//     console.log("album id ")

//     catalog.getVideosWithAlbumId(req.query.album)
//     .then( data => {
//       res.json(data)
//     })
//     .catch( err => [
//       console.log( err)
//     ])

//       // try {
//       //
//       //   let data = fs.readFileSync( "./data/videos.json")
//       //   let jsonData = JSON.parse(data)
//       //
//       //   let collection = []
//       //
//       //   jsonData.map( item => {
//       //     if(item.albumId == req.query.album){
//       //       console.log(item)
//       //       collection.push(item)
//       //     }
//       //   })
//       //
//       //   res.json(collection)
//       //
//       // }
//       // catch (err ){
//       //   console.log( err)
//       // }

//     break;
//     case "id":
//     console.log( req.query.id)
//     contentProvider.getVideoWithId(req.query.id)
//     .then( data => {
//       let date = new Date()
//       console.log( date)
//       res.json(data)
//     })
//     .catch( err => {
//       console.log( err )
//       res.sendStatus(500)
//     })

//       break;
//     default:

//     catalog.GetVideoLibaryData(req.query.user)
//     .then( data => { res.json( data )})
//     .catch( err => { console.log( err )})
//     // try {
//     //     let data = fs.readFileSync( "./data/videoSection.json")
//     //     console.log( JSON.parse(data))
//     //     res.json(JSON.parse(data))
//     // }
//     // catch (err ){
//     //   console.log( err)
//     // }
//   } }) 
// app.get('/api/v1/videos/trending', (req,res) => {
  // db.getTrendingVideos()
  // .then( data => {
  //   console.log( data )
  //   res.json(data)
  // })
  // .catch( err => console.log( err )) })

// app.post('/api/v1/user/saved', (req,res) => {

//   db.SaveAlbum(req.query.userId, req.body)
//   .then( result => {
//     res.sendStatus(result)
//   })
//   .catch( err => {
//     console.log( err )
//     res.sendStatus(500)
//   }) })
// app.post('/api/v1/user/savedTracks', (req,res) => {
//   console.log( req.body)
//   db.saveTrack(req.query.user, req.body)
//   .then( result => {
//     res.sendStatus(result)
//   })
//   .catch( err => {
//     res.sendStatus( 500 )}) })
// app.post('/api/v1/user/history', (req,res) => {

//   console.log( req.body)
//   db.AddItemSearchToHistory(req.body)
//   .then( data => {

//   })
//   .catch( err => {
//     console.log(err)
//     res.sendStatus(500)
//   }) })
// app.post("/api/v1/artist", (req,res) => {
//   db.createNewArtist(req.body)
//   .then( () => {
//     res.sendStatus(200)
//   })
//   .catch( err => {
//     console.log(err)
//     res.sendStatus(200)
//   }) })

// Subscribe -> add user to following 
app.post('/api/v1/user/subscriptions', (req,res) => {

  // res.sendStatus(200)

  db.AddNewFollower(req.query.id, req.body)
  .then( data => {
    res.sendStatus(data)
  })
  .catch( err => { console.log(err)}) 
})

// Unsubscribe -> delete user from following
app.delete('/api/v1/user/subscriptions', (req,res) => {
  console.log( req.query.id)
  // res.sendStatus(200)
  db.UnfollowArtist(req.query.user, req.query.id)
  .then( data => {
    console.log(data)
    res.sendStatus(data)
  })
  .catch( err => {
    res.sendStatus(500)
  }) })

// app.delete('/api/v1/user/saved', (req, res) => {
  // console.log(req.query)
  // db.RemoveAlbumFromSaved(req.query.userId, req.query.id)
  // .then( result => {
  //   res.sendStatus(result)
  // })
  // .catch( err => {
  //   console.log( err )
  //   res.sendStatus(500)
  // }) })

// app.delete('/api/')
db.initialize()
.then( () => (auth.initialize() ))
.then( () => {
  app.listen(app.get('port'), () => { console.log(`started app on`, app.get('port')) }) })
.catch( err => { console.log(err) })
