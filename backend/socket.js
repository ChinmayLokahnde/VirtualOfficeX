const {Server} = require('socket.io');
const jwt = require('jsonwebtoken');
const { text } = require('express');


function initSocket(httpServer){
const io = new Server(httpServer, {
  cors:{
    origin: '*',
    methods: ["GET", "POST"],
  },
});

io.use((socket, next)=>{
    const token = socket.handshake.auth?.token;
    if(!token) return next(new Error("Auth Token Missing"));
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.data.user = {id: decoded.id, email: decoded.email};
        next();
    }catch(err){
        next(new Error("Auth Failed"));
    }
});

io.on("connection", (socket)=>{
    console.log("user connected", socket.data.user);

    socket.on("join_room", ({roomId})=>{
        socket.join(roomId);
        io.to(roomId).emit("user_joined", {user: socket.data.user});
    });

    socket.on("leave_room", ({roomId})=>{
        socket.leave(roomId);
        io.to(roomId).emit("user_left", {user: socket.data.user});
    });

    socket.on("chat_message", ({roomId})=>{
        io.to(roomId).emit("chat_message",{
            user: socket.data.user,
            text,
            ts:Date.now()
        });
    });

    socket.on("player_move", ({roomId, x, y, dir})=>{
        io.to(roomId).emit("player_update", {
            user: socket.data.user,
            x,
            y,
            dir,
        });
    });

    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.data.user)
    });
});
}

module.exports = initSocket;
