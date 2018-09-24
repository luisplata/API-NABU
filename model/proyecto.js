var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/api");


var proyecto = new Schema({
	nombre:String,
		descripcion:String,
		repositorio:String,
		setup:{},
		workspace:{},
		company:{}
});

var Proyecto = mongoose.model("Proyecto",proyecto);

module.exports.Proyecto = Proyecto;