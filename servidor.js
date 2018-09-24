var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var entorno = require('./model/config-modules.js').config();

//configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//importacion de rutas
var rutasUsuarios = require("./router/users");
var login = require("./router/login");

app.use("/user",rutasUsuarios);
app.use("/login",login);

app.listen(80);