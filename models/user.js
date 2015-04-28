var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userScheMa = new Schema({
	email: String,
	password: String,
	sip: String,
	spt: String,
	pwd: String,
	encry: String,
	lpt: String,
	enddate: {type: Date, default: Date.now },
	status: {type: String, default: "0" },
	orders: [{
		orderid: String,
		buydate: Date,
		packgename: String,
		total: Number,
		payment: Number,
		paystatus: String,
		couponcode: String,
		percent: {type: Number, default: 1 },
		cutmoney: {type: Number, default: 0 },
	}],
	notice: [{
		name: String,
		content: String,
		status: {type: String, default: "0" },
		notedate: String
	}]
});
exports.user = mongoose.model('users', userScheMa);