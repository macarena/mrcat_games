const socket = io();

let nome_usuario = prompt("Diga seu nome? (ou não, vc quem sabe...)");

const ff = [
    "Mussum",
    "Zacarias",
    "Didi",
    "Dedé",
    "Lula",
    "Bolsonaro",
    "Dilma",
    "Coronga Vírus",
];

if (nome_usuario === null || nome_usuario == "" || nome_usuario == " ") {
    nome_usuario = ff[Math.floor(Math.random() * ff.length)];
}

socket.emit('join', nome_usuario);

socket.on('update', function(msg){
    let ul = document.getElementById("messages");
    let li = document.createElement('li');
    let br = document.createElement('br');
    li.appendChild(document.createTextNode(msg));
    ul.appendChild(li);
});

socket.on('chat', function(user, msg){
    newMessage(user, msg);
});

socket.on('online_users', function(users){
    console.log(users);
});

function newMessage(user, msg) {
    let ul = document.getElementById("messages");
    let li = document.createElement('li');
    let br = document.createElement('br');
    li.appendChild(document.createTextNode(user + ": " + msg));
    ul.appendChild(li);
}