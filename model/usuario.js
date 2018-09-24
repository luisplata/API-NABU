var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/api");

var tiposDeUsuario=["admin","cto","dev"];

var usuario_esquema = new Schema({
	nombre:String,
	mail:{type:String,unique:true},
	pass:String,
	tipo:{
		type:String,
		default:tiposDeUsuario[2],
		enum:{values:tiposDeUsuario,message:"No eres un tipo valido"}
	},
	tokens:{},
	proyecto:{},
	administracion:{},
	isVerificoPass:Boolean
});


var Usuario = mongoose.model("Usuario",usuario_esquema);

module.exports.Usuario = Usuario;