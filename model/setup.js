var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/api");


var setup = new Schema({
	nombre:String,
	open_tabs:String,
	creado:{type:Date,default:Date.now},
	modificado:{type:Date,default:Date.now}
});

var SetUp = mongoose.model("SetUp",setup);

module.exports.SetUp = SetUp;