var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var scoksaccountScheMa = new Schema({
	sip: String,
	spt: String,
	pwd: String,
	encry: String,
	lpt: String,
	status: String
});
exports.scoksaccount = mongoose.model('scoksaccounts', scoksaccountScheMa);