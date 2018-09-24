var express = require("express");
var route = express.Router();
var jwt = require('jsonwebtoken');

var Usuario = require("../model/usuario").Usuario;
var Token = require("../model/tokens").Token;
var SetUp = require("../model/setup").SetUp;
var Proyecto = require("../model/proyecto").Proyecto;
var Company = require("../model/company").Company;


route.post("/",function(req,res){
	//buscamos al usuario con las credenciales
	Usuario.findOne({mail:req.body.email,pass:req.body.password},
		function(err,dato){
		if(dato){
			res.json(autenticando(req.body.email));
		}else{
			res.json({status:404,message:"El usuario no existe"});
		}
	});
});

function autenticando(username){
	var tokenData = {
		username: username
		// ANY DATA
	}

	var token = jwt.sign(tokenData, 'Secret Password', {
		expiresIn: 60 * 60 * 24 // expires in 24 hours
	});

	return token;
}

function validandoAutenticacion(req){
	var token = req.headers['authorization']
    if(!token){
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, 'Secret Password', function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      } else {
        res.send({
          message: 'Awwwww yeah!!!!'
        })
      }
    })
}

module.exports = route;