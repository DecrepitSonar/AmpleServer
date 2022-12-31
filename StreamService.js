
// const GetObjectCommand = require("@aws-sdk/client-s3").GetObjectCommand
// const readStream = require("stream")
// const s3Client = require("./s3Client.js").s3Client
// const models = require('./data/models.js')
// const utils = require("./Utils.js")

// let audioBucket = {
//   Bucket: "prophile", 
//   Key: "" }

// const imageBucket = {
//   bucket: "",
//     key: ""}
// const getChunksFromStream = (stream) => {
//   let chunks = []
//   return new Promise((resolve, reject) => {
//     stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
//     // console.log(chunks)
//     stream.on("error", (error) => console.log( error))
//     stream.on("end", resolve(Buffer.concat(chunks).toString("utf8")))
//   }) }
// const run = async (bucketParams) => {
//   try {
//     const response = await s3Client.send(new GetObjectCommand(bucketParams));
//     console.log(response)
//     const data = await getChunksFromStream(response.Body);
//     console.log(response.body)
//     fs.writeFileSync("/tmp/local-file.ext", data);
//     console.log("Success", data);
//     return data;
//   } catch (err) {
//     console.log("Error", err);
//   } };

//   // Audio
// exports.getRandomAudio = async() => {
//   // return new Promise( (resolve, reject) => {
//     let track = models.Track.find()
//     .exec()
//     .then( data => {
//       if( data != null && data.length > 0){
//         return data[utils.getRandom(data.length)]
//       }
//       else{ return }
//     })
//     .catch( err => { return err})

//   console.log( track)
//     return track}

// // Videos
// exports.getVideosWithAlbumId = async (id) => {

//   let result = models.Videos.find({albumId: id})
//   .exec()
//   .then( data => {
//     return data
//   })

//   return result}
// exports.getVideoWithId = async (id) => {

//   let result = models.Videos.findOne({id: id})
//   .exec()
//   .then( data => {
//     console.log( data )
//     return data
//   })
//   .catch( err => {
//     return err
//   })

//   return result}

