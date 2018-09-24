var express = require("express");
var route = express.Router();
var entorno = require('../model/config-modules.js').config();
var SetUp = require("../model/setup").SetUp;
var Validacion = require("../model/validacion").Validacion;

//retornando todos los setups
route.get("/",function(req,res){
	SetUp.find().then(function(dato){
		res.json(dato);
	},function(err){
		res.json(err);
	});
});

route.get("/:setup_id",function(req,res){
	SetUp.findById(req.params.setup_id).then(function(dato){
		res.json(dato);
	},function(err){
		res.status(404);
		res.json(err);
	});
});

//guardando un setup
route.post("/",function(req,res){
	if(Validacion.isValid(req)){
		var setup = SetUp();
		setup.nombre = req.body.setup_nombre;
		setup.open_tabs = req.body.open_tabs;
		setup.save().then(function(dato){
			res.json(dato);
		},function(err){
			res.json(err);
		});
	}else{

	}
});

//editando
route.put("/",function(req,res){
	Validacion.isValid(req).then(function(token){
		SetUp.findById(req.body.setup_id).then(function(dato){
			dato.nombre = req.body.nombre;
			dato.open_tabs = req.body.open_tabs;
			dato.modificado = Date.now();
			dato.save().then(function(dato){
				res.json(dato);
			},function(err){
				res.json(err);
			});
		},function(err){
			res.json(err);
		});
	},function(err){
		err(res);
	});
});

route.delete("/",function(req,res){
	Validacion.isValid(req).then(function(token){
		SetUp.findByIdAndRemove(req.body.setup_id).then(function(dato){
			res.json(dato);
		},function(err){
			res.json(err);
		});
	},function(err){
		err(res);
	});
});

module.exports = route;