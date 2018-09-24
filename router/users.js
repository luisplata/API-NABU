var express = require("express");
var route = express.Router();

var Usuario = require("../model/usuario").Usuario;
var Token = require("../model/tokens").Token;
var SetUp = require("../model/setup").SetUp;
var Proyecto = require("../model/proyecto").Proyecto;
var Company = require("../model/company").Company;


route.get("/",function(req,res){
	//mostramos todos los usuarios
	Usuario.find().then(function(usuarios){
		res.send(usuarios);
	});
});

route.post("/",function(req,res){
	//vamos a registrar al usuario
	var usuario = new Usuario();
	usuario.mail = req.body.email;
	usuario.nombre = req.body.nombre;
	usuario.pass = req.body.pass;

	SetUp.findById(req.body.setup_id).then(function(dato){
		if(dato){
			usuario.setUp = dato;
		}else{
			setup = new SetUp();
			setup.save().then(function(dato){
				usuario.setUp = dato;
			});
		}

		usuario.save().then(function(dato){
			res.json(dato);
		},function(err){
			console.log(err);
			res.json("Error "+String(err));
		});
	});
});


module.exports = route;