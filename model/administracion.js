var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/api");

var tiposDeUsuario=["admin","cto","dev"];

var administracion = new Schema({
	creado:{type:Date,default:Date.now},
	modificado:{type:Date,default:Date.now}
});


var Administracion = mongoose.model("Usuario",administracion);

module.exports.Administracion = Administracion;