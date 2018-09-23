var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost/api");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//esquemas
var usuarios={
	nombre:String,
	pass:String
};

var esquemaUsuario = mongoose.Schema(usuarios);

var Usuario = mongoose.model("Usuario",esquemaUsuario);

app.get("/login",function(req,res){
	Usuario.find(function(err,doc){
		console.log(doc);
		//var completo = req.params.nombre+"-"+req.params.contrasenia;
		res.send(doc);
	});
	
});
app.post("/login",function(req,res){
	var completo = req.body.nombre+"-"+req.body.pass;
	console.log(req.body.nombre);
	console.log(req.body.pass);
	var usuario = new Usuario({nombre:req.body.nombre,pass:req.body.pass});
	usuario.save(function(){
		res.send(usuario.nombre+"+"+usuario.pass);
	});
	
});

app.listen(80);