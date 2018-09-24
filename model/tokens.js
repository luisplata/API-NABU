var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/api");


var tokens = new Schema({
	gitlab:String,
	github:String,
	twitter:String,
	bitbukeck:String,
	spotify:String
});

var Token = mongoose.model("Token",tokens);

module.exports.Token = Token;