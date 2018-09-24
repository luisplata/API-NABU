var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/api");


var workspace = new Schema({
	nombre:String,
	descripcion:String
});

var Workspace = mongoose.model("Proyecto",workspace);

module.exports.Workspace = Workspace;