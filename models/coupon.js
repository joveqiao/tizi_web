var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var couponScheMa = new Schema({
	couponcode: String,
	percent: {type: Number, default: 1 },
	cutmoney: {type: Number, default: 0 },
	status: String,
	enddate: Date
});
exports.coupon = mongoose.model('coupons', couponScheMa);