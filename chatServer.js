
module.exports = ( io, socket) => {

    const handleMessage = (id, data ) =>{
        io.to(id).emit("message", data )
    }

    socket.on("data", data => {
        handleMessage(data.streamId, data)
    })
}