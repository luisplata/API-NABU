var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/api");


var company = new Schema({
	nombre:String,
	pais:String,
	ciudad:String,
	email:String,
	direccion:String,
	logo:String
});

var Company = mongoose.model("Company",company);

module.exports.Company = Company;