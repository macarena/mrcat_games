'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = express()
  .use(express.static(__dirname + '/static'))
  .listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const io = socketIO(server);

const clients = {};

io.on("connection", function (client) {  
    client.on("join", function(name){
    	console.log(name + " entrou");
        clients[client.id] = name;
        client.emit("update", "Você se conectou a sala.");
        client.emit("online_users", clients);
        client.broadcast.emit("update", name + " entrou na sala!")
    });

    client.on("send", function(msg){
    	console.log("Mensagem: " + msg);
        client.broadcast.emit("chat", clients[client.id], msg);
    });

    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("update", clients[client.id] + " saiu da sala.");
        delete clients[client.id];
    });
});