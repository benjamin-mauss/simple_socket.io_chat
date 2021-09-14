const http = require("http")
const express = require("express")
const socketio = require("socket.io")

const app = express()

// uncouple the http server from app variable
const httpServer = http.createServer(app)
const io = new socketio.Server(httpServer)


let messages = []
io.on("connection", (socket) =>{
    
    console.log(socket.id)
    socket.emit("messages",messages)

    socket.on("message", (message) => {
        messages.push(message)
        socket.broadcast.emit("message",[message[0], message[1]])
    })
})


app.use(express.static("public"))


httpServer.listen(3000)

