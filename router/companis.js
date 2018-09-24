var express = require("express");
var route = express.Router();
var entorno = require('../model/config-modules.js').config();
var Company = require("../model/company").Company;


//retornando la lista de compañias
route.get("/",function(req,res){
	res.json(Company.find());
});

//creando compañias
route.post("/",function(req,res){
	var compani = new Company();
	
});


module.exports = route;