const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket =  require('socket.io');
const io = socket(http);



/**
 * Event when the client tries to connect to the server
 */
let clientCount = 0;
 io.on('connection',(socket)=>{
    console.log("One Client connected");
    clientCount++;

    /**
     * Broadcast the messages to all the client
     */
    //io.sockets.emit('broadcast',{description:"clients connected ="+ clientCount})
     /**
     * Broadcast the messages to all the client except this one
     */
    // For the client which is getting connected
     socket.emit('newClientconnected',{description:"Hey welcome"});
     // For broadcasting to every other client
    socket.broadcast.emit('newClientconnected',{description:"Client count:"+clientCount})
    
    // socket.on("clientEvent",(data)=>{
    //     console.log(data);
    // }) // read data from client
    /**
     * Send some message to the client after 5 seconds of connection
     */

    // setTimeout(()=>{
    //     socket.send("Hello from the server after 5 seconds atleast");
    // },5000);
    // when the client closed
    socket.on('disconnect',()=>{
        console.log("One client disconnected");
        clientCount--;
        io.sockets.emit('newClientconnected',{description:"clients connected ="+ clientCount})

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