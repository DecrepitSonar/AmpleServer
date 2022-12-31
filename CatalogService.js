
const { Users } = require('./Models/Users.js')
const { Featured } = require('./Models/Featured.js')
const { History } = require('./Models/History.js')
const { Albums } = require('./Models/Albums.js')
const { Shows } = require("./Models/Shows.js")
const { FeaturedMix } = require("./Models/FeaturedMix.js")
const { Playlists } = require("./Models/Playlists.js")
const { Episodes } = require("./Models/Episodes.js")
const { FeaturedVideos } = require("./Models/FeaturedVideos.js")
const { Videos } = require("./Models/Videos.js")
const { Tracks } = require("./Models/Tracks.js")

const { Section, Channel, Episode } = require("./Utils.js")

const uuid = require('uuid')

exports.GetUserLibraryData = async(id) => {

    let section = []

    let user = await Users.findOne({id: id})
    .exec()
    .then( result => {
      console.log(result)
      return result
    })
    .catch( err => {
      return err
    })

    let artists = new Section
    artists.id = uuid.v4()
    artists.type = "Artists"
    artists.tagline = "Your Artists"
    artists.items = user.following

    artists.items.length > 0 ? section.push(artists) : null

    let history = new Section
    history.id = uuid.v4()
    history.type = "History"
    history.tagline = "Recent Tracks"
    history.items = user.listeningHistory

    history.items.length > 0 ? section.push(history) : null

    let videoHistory = new Section
    videoHistory.id = uuid.v4()
    videoHistory.type = "Videos"
    videoHistory.tagline = "Watch Again"
    videoHistory.items = user.watchHistory

    videoHistory.items.length > 0 ? section.push(videoHistory) : null

    let savedVideos = new Section
    savedVideos.id = uuid.v4()
    savedVideos.type = "Videos"
    savedVideos.tagline = "Saved Videos"
    savedVideos.items = user.savedVideos

    savedVideos.items.length > 0 ? section.push(savedVideos) : null


    let savedTracks = new Section
    savedTracks.id = uuid.v4()
    savedTracks.type = "Saved Tracks"
    savedTracks.tagline = "Songs you like"
    savedTracks.items = user.saved

    savedTracks.items.length > 0 ? section.push(savedTracks) : null

    let savedAlbums = new Section
    savedAlbums.id = uuid.v4()
    savedAlbums.type = "Saved Albums"
    savedAlbums.tagline = "Saved Albums"
    savedAlbums.items = user.albums
    savedAlbums.items.length > 0 ? section.push(savedAlbums) : null

    let savedPlaylists = new Section
    savedPlaylists.id = uuid.v4()
    savedPlaylists.type = "Playlist"
    savedPlaylists.tagline = "Your playlists"
    savedPlaylists.items = user.playlists
    
    console.log(user.playlists)
    savedPlaylists.items.length > 0 ? section.push(savedPlaylists) : null

    console.log(section)

    return section }
exports.GetUserHomeData = async(id) => {
    let catalog = []

    let user = await Users.findOne({id: id})
    .exec()
    .then( result => {
      console.log(result)
      return result})
    .catch ( err => { return err })

    
    let featured = new Section
    featured.id = uuid.v4()
    featured.type = "Featured"
    featured.tagline = "Featured"
    
    await Featured.find()
    // .limit()
    .exec()
    .then( data => {
      if( data != null && data.length > 0){
        featured.items = data 
        catalog.push(featured)
      }})
    .catch( err => { return err })

    let sectionCatagories = new Section
    sectionCatagories.id = uuid.v4()
    sectionCatagories.type = "Browse"
    sectionCatagories.tagline = "Browse"
    sectionCatagories.items = [
      {
        id: '233692e0aad5a445107564ca1bb68d51',
        type: 'All',
        title: "Catalog",
        artist: '',
        imageURL: 'pastel-gradient-art-wtlblhphaj0kja3d.jpeg',
        __v: 0,
        posterImage: '0e70f8a80ed329a467cb283e2277c8e34383c08c'
      },
      {
        id: '233692e0aad5a445107564ca1bb68d51',
        type: 'Trending',
        title: "Trending",
        artist: '',
        imageURL: 'pastel-gradient-art-wtlblhphaj0kja3d.jpeg',
        __v: 0,
        posterImage: '0e70f8a80ed329a467cb283e2277c8e34383c08c'
      },
      {
        id: '233692e0aad5a445107564ca1bb68d51',
        type: 'Video',
        title: "Videos",
        artist: '',
        imageURL: 'pastel-gradient-art-wtlblhphaj0kja3d.jpeg',
        __v: 0,
        posterImage: '0e70f8a80ed329a467cb283e2277c8e34383c08c'
      },
      {
        id: '233692e0aad5a445107564ca1bb68d51',
        type: 'Podcast',
        title: "Podcast",
        artist: '',
        imageURL: 'pastel-gradient-art-wtlblhphaj0kja3d.jpeg',
        __v: 0,
        posterImage: '0e70f8a80ed329a467cb283e2277c8e34383c08c'
      }]

    sectionCatagories.items.length > 0 ? catalog.push(sectionCatagories): null

    let history = new Section
    history.id = uuid.v4()
    history.type = "History"
    history.tagline = "Recent"
    history.items = user.listeningHistory

    history.items.length > 0 ? catalog.push(history) : null


    let newAlbums = new Section
    newAlbums.type = "Releases"
    newAlbums.tagline = "New for You"

    if( user.following != undefined ){
      user.following.forEach( async function ( item ){

      await Albums.find({type: "Album", artistId: item.id})
      .sort({releaseDate: -1})
      .limit(1)
      .exec()
      .then( data => {
        // console.log(data)
        if(data != null && data.length > 0){
          newAlbums.items.push( data[0])
          catalog.push(newAlbums)
          return
        }
        else { return }})
      .catch( err => { return err }) }) } 

    let Singles =  new Section
    Singles.id = uuid.v4()
    Singles.type = "Singles"
    Singles.tagline = "Singles for you"

    if( user.following != undefined){

      user.following.forEach( async function( item ){

      await Albums.find({type: "Single", artistId: item.id})
      .sort({timestamp: -1})
      .limit(1)
      .exec()
      .then( data => {
        if(data != null && data.length > 0){
          Singles.items.push(data[0])
          return
        }
        else { return }
      })
      .catch( err => { return err })
      })

      Singles.items.length > 0 ? catalog.push(Singles): null}

    let albumSection = new Section
    albumSection.type = "Releases"
    albumSection.tagline = "New On Ample"

    await Albums.find()
    .sort({releaseDate: -1})
    .limit(5)
    .exec()
    .then( data => {
      // console.log(data)
      if(data != null && data.length > 0){
        albumSection.items = data
        catalog.push(albumSection)
        return 
      }
      else { return } })
    .catch( err => { return err })

    // let discover =  new Section
    // discover.id = uuid.v4()
    // discover.type = "Discover"
    // discover.tagline = "Discover "

    // await Albums.find()
    // .sort({timestamp: -1})
    // .limit(5)
    // .exec()
    // .then( data => {
    //   if(data != null && data.length > 0){
    //     discover.items = data
    //     catalog.push(discover)
    //     return
    //   }
    //   else { return }})
    // .catch( err => { return err })

    let shows =  new Section
    shows.id = uuid.v4()
    shows.type = "Podcast"
    shows.tagline = "Shows you might like"

    await Shows.find()
    .exec()
    .then( data => {
      if(data != null && data.length > 0){
        shows.items = data
        catalog.push(shows)
        return
      }
      else { return }})
    .catch( err => { return err })

    let dailyMix =  new Section
    dailyMix.id = uuid.v4()
    dailyMix.type = "Playlists"
    dailyMix.tagline = "Daily Mixes"

    await FeaturedMix.find()
    .sort({timestamp: -1})
    .limit(5)
    .exec()
    .then( data => {
      if(data != null && data.length > 0){
        data.forEach ( (item ) => {
          item.id = uuid.v4()
          dailyMix.items.push(item)
          catalog.push(dailyMix)
        })

        return
      }
      else { return } })
    .catch( err => { return err })


    let moodMix = new Section
    moodMix.id = uuid.v4()
    moodMix.type = "Mix"
    moodMix.tagline = "Mix for every mood"

    await Playlists.find({genre: "moodMix"})
    .exec()
    .then( data => {
      if( data.length > 0 && data != null){
        moodMix.items = data
        catalog.push(moodMix)
      }
      return })
    .catch( err => { return err })

    let seasonMix = new Section
    seasonMix.id = uuid.v4()
    seasonMix.type = "Mix"
    seasonMix.tagline = "Vibes for the seasons"

    await Playlists.find({genre: "seasonal"})
    .exec()
    .then( data => {
      if( data.length > 0 && data != null){
        seasonMix.items = data
        catalog.push(seasonMix)
      }
      return })
    .catch( err => { return err })


    let cover = new Section
    cover.id = uuid.v4()
    cover.type = "Mix"
    cover.tagline = "Cover Me"

    await Playlists.find({genre: "cover"})
    .exec()
    .then( data => {
      if(data != null && data.length > 0){
        cover.items = data
        catalog.push(cover)
      }
      return })
    .catch( err => { return err })

    return catalog
 }
exports.GetVideoLibaryData = async(id) => {

  let user = await Users.findOne({id: id})
  .exec()
  .then( data => { return data })
  .catch( err => { return err })

  var sections = []

  let featuredSection = new Section
  featuredSection.id = uuid.v4()
  featuredSection.type = "Featured"
  featuredSection.tagline = "Featured Video"
  featuredSection.items = await FeaturedVideos.find()
  .exec()
  .then( data => { return data })

  sections.push( featuredSection )

  let videoHistory = new Section
  videoHistory.id = uuid.v4()
  videoHistory.type = "Watch History"
  videoHistory.tagline = "Watch Again"
  videoHistory.items = user.watchHistory

  videoHistory.items.length > 0 ? sections.push(videoHistory) : null

  let trendingMusicVideos = new Section
  trendingMusicVideos.id = uuid.v4()
  trendingMusicVideos.type = "Music "
  trendingMusicVideos.tagline = "Audio Visuals"
  trendingMusicVideos.items = await Videos.find({type: "music"})
  .sort({releaseDate: -1})
  .limit(5)
  .exec()
  .then( data => { return data })
  .catch( err => { return err })

  trendingMusicVideos.items.length > 0 ? sections.push(trendingMusicVideos) : null

  let shows = new Section
  shows.id = uuid.v4()
  shows.type = "Podcasts"
  shows.tagline = "Podcasts"
  shows.items = await Videos.find({type: "podcast"})
  .sort({releaseDate: -1})
  .limit(5)
  .exec()
  .then( data => { return data })
  .catch( err => { return err })

  shows.items.length > 0 ? sections.push( shows) : null
  console.log( shows)

  // console.log( sections )

  return sections }
exports.getTrendingTracks = async () => {

  let sections = []

  let topTracks = new Section 
  topTracks.id = uuid.v4()
  topTracks.type = "Hot",
  topTracks.tagline = "Ample Hot 20"
  topTracks.items = await Tracks.find()
  .sort({playCount: -1})
  .limit(10)
  .then( data => { return data })

  sections.push(topTracks)

  let popularVideos = new Section
  popularVideos.id = uuid.v4()
  popularVideos.type = "Videos"
  popularVideos.tagline = "Popular Visuals"
  popularVideos.items = await Videos.find()
  .sort({views: -1})
  .limit( 5)
  .exec()
  .then( data => { return data })
  .catch( err => { return err })

  sections.push(popularVideos)

  let interview = new Section
  interview.id = uuid.v4()
  interview.type = "Videos"
  interview.tagline = "Popular Interview"
  interview.items = await Videos.find({type: "podcast"})
  .sort({views: -1})
  .limit( 5)
  .exec()
  .then( data => { return data })
  .catch( err => console.log( err ))

  sections.push(interview)

  let albums = new Section 
  albums.type = uuid.v4()
  albums.tagline = "Top Trending Albums"
  albums.items = await Albums.find({type: "Album"})
  .limit(5)
  .exec()
  .then( data => { return data })
  .catch( err => { return err} )

  sections.push(albums)

  let trendingArtist = new Section
  trendingArtist.id = uuid.v4()
  trendingArtist.type = "Artist"
  trendingArtist.tagline = "On The rise"
  trendingArtist.items = await Users.find()
  .sort({subscribers: -1})
  .limit(5)
  .exec()
  .then( data => { return data })

  sections.push(trendingArtist)

  return sections
  }
