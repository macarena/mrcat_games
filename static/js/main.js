const chat_msg = $("input#chat_msg");
const send_btn = $("button#send");
const chat = $("ul#chat");

chat_msg.keypress((e) => {
    var key = e.which || e.keyCode;
    if (key == 13) sendMessage();
});

send_btn.click(sendMessage);

function sendMessage() {
    msg = chat_msg.val();
    if (msg.length > 0) {
        socket.emit('send', msg);
        newMessage("eu", msg);
        chat_msg.val('');
    }
}

function newMessage(user, msg) {
    addMessage(user + ": " + msg);
}

function addMessage(text) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(text));
    chat.append(li);
}