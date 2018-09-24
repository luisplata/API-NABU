var express = require("express");
var route = express.Router();
var jwt = require('jsonwebtoken');
var entorno = require('../model/config-modules.js').config();

var Usuario = require("../model/usuario").Usuario;
var Token = require("../model/tokens").Token;
var SetUp = require("../model/setup").SetUp;
var Proyecto = require("../model/proyecto").Proyecto;


route.post("/",function(req,res){
	//buscamos al usuario con las credenciales
	Usuario.findOne({mail:req.body.email,pass:req.body.password}).then(
		function(dato){
		if(dato){
			dato.token = autenticando(dato.email);
			dato.save().then(function(dato){
				res.json(dato);
			},function(err){
				res.json(err);
			})
			
		}
	},function(err){
		res.json(err);
	});
});

route.get("/",function(req,res){
	validandoAutenticacion(req,res,function(respuesta){
		res.status(respuesta.status);
		res.json(respuesta.mensaje);
	});
});

function autenticando(username){
	var tokenData = {
		username: username
		// ANY DATA
	}
	var token = jwt.sign(tokenData, entorno.secret, {
		expiresIn: 60 * 60 * entorno.lifeToken // expires in 24 hours
	});

	return token;
}

function validandoAutenticacion(req,res,callback){
	var respuesta = {status:100,mensaje:{},token:""};
	respuesta.token = req.headers['authorization']
    if(!respuesta.token){
		respuesta.status = 401;
		respuesta.mensaje="El token anda mal en el head";
		respuesta.token="";
		callback(respuesta);
    }

    respuesta.token = respuesta.token.replace('Bearer ', '');

	jwt.verify(respuesta.token, entorno.secret, function(err, user) {
      if (err) {
			respuesta.status = 401;
			respuesta.mensaje="El token anda mal en el cuerpo";
			respuesta.token="";
			callback(respuesta);
      } else {
		//buscamos al usuario para devolver la data
		Usuario.findOne({token:respuesta.token},"mail nombre token tipo").then(function(data){
			respuesta.mensaje = data;
			respuesta.status = 200;
			callback(respuesta);
		},function(err){
			console.log(err);
		});
      }
    });
}

module.exports = route;