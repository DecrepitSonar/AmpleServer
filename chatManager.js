module.exports = (socket ) => {


    const  joinRoom = (roomId ) => {
        socket.to(roomId).emit( "connected", "connected")
        socket.join(roomId)
    }
    
    const  leaveRoom= (roomId ) => {
        socket.leave(roomId)
    }

    socket.on("join", joinRoom )
    socket.on("leave", leaveRoom )
}