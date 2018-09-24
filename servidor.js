var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var entorno = require('./model/config-modules.js').config();
var Validacion = require("./model/validacion").Validacion;

//configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//importacion de rutas
var rutasUsuarios = require("./router/users");
var login = require("./router/login");
var setup = require("./router/setup");

app.get("/",function(req,res){
	res.json(Validacion.isValid(req.headers['authorization']));
});

app.use("/user",rutasUsuarios);

app.use("/login",login);

app.use("/setup",setup);

app.listen(80);