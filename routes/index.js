var express = require('express');
var router = express.Router();
var randomCode = require('../common/tools').randomCode;
var mongoose = require('mongoose');

var user = require('../models/user').user;
var scoksaccount = require('../models/scoksaccount').scoksaccount;
var coupon = require('../models/coupon').coupon;

mongoose.connect('mongodb://localhost/tiziservice');

//index page
router.get('/', function(req, res, next) {
	
	var DDoscode = randomCode(8);
	console.log("code");
	res.render('index', {page:"signup", error : "", info: ""});
});

//signup
router.post('/signup', function(req, res, next) {
	
	var email = req.body.email;
	var password = req.body.password;
	var emailverify = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	console.log(emailverify.test(email));
	if (!emailverify.test(email)) {
		res.render('index', {page:"signup", error : "error", info: "请输入您的邮箱！"});
	}else if(!!password && password.length > 4){
		res.render('index', {page:"signup", error : "error", info: "密码好像太少了吧！"});
	}else{
		user.count({ email : email},function( err, doc){
			if(doc == 0){
				var userstap = new user({
					email: email,
					password: password
				});
				userstap.save(function(err) {
				  if (err) throw err;
				  console.log('User：'+email+' saved successfully!');
				});
				req.session.user = userstap;
				res.render('usercenter', {user : userstap});
			}else{
				res.render('index', {page:"signup", error : "exist",email:email, info: "账号已经存在，请登录！"});
				console.log('User：'+email+' fail signup, account aready exist!');
			}
		});
	}
});

//signin
router.post('/signin', function(req, res, next) {
	
	var email = req.body.email;
	var password = req.body.password;
	user.find({ email : email, password: password}, function(err, user) {
		if (err) throw err;
		if(user.length == 1){
			req.session.user = user;
			res.redirect('/index');
		}else{
			console.log('User：'+email+' fail signin, account input error!');
		  	res.render('index', {page:"signin", error : "error", info: "账号或密码有误，请重试！"});
		}
	});
});

//index
router.get('/index', function(req, res, next) {
	res.render('usercenter', {user : req.session.user[0]});
});

//signout
router.get('/signout', function(req, res, next) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
});


module.exports = router;