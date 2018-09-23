var http = require("http"),
fs = require("fs");

var servidor = http.createServer(function(solicitud, responder){
	
	responder.end("hola");
});

servidor.listen("80");