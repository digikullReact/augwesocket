const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const port =process.env.PORT || 9191


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000"],
   
    }
  });


      
   
    app.use(express.static('dist'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,  'dist', 'index.html'));
    });



io.on("connection", (socket) => {
  // ...
  console.log("Client Connected");

 socket.on("message",(data)=>{

   socket.broadcast.emit("receive",data);
 })


});

httpServer.listen(port);