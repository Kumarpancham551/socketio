const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket =  require('socket.io');
const io = socket(http);



/**
 * Event when the client tries to connect to the server
 */
 io.on('connection',(socket)=>{
    console.log("One Client connected")
    /**
     * Send some message to the client after 5 seconds of connection
     */
    setTimeout(()=>{
        socket.send("Hello from the server after 5 seconds atleast");
    },5000);
    // when the client closed
    socket.on('disconnect',()=>{
        console.log("One client disconnected");
    })
 })

/**
 * Rendering html
 */

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})



http.listen(8080,()=>{
    console.log("Application started");
})