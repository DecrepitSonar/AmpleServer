module.exports = (io, socket ) => {

    const  joinRoom = (roomId ) => {
        socket.join(roomId)
        socket.to(roomId).emit( "connected", "connected")
    }
    
    const  leaveRoom= (roomId ) => {
        socket.leave(roomId)
    }

    socket.on("join", joinRoom )
    socket.on("leave", leaveRoom )
}