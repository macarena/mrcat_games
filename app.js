var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {}; 

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

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


http.listen(3000, function(){
    console.log('Servidor rodando em: http://localhost:3000');
});