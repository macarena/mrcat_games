$( document ).ready(function(){
    document.getElementById('menssagem').addEventListener('keypress', function(e) {
        var key = e.which || e.keyCode;
        if (key == 13) {
            enviar_menssagem();
        }
    });
    
    document.getElementById('enviar_menssagem').addEventListener("click", enviar_menssagem);
    function enviar_menssagem() {
        msg = document.getElementById('menssagem').value;
        if (msg.length > 0) {
            console.log(msg);
            socket.emit('send', msg);
            document.getElementById('menssagem').value = "";
            newMessage("eu", msg);
        }
    }
});