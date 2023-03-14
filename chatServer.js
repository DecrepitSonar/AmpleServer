
module.exports = ( io, socket) => {

    const handleMessage = (id, data ) =>{
        socket.to(id).emit("message", data )
    }

    socket.on("data", data => {
        console.log( data.streamId )
        handleMessage(data.streamId, data)
    })
}