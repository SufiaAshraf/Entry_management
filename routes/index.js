var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User     = require("../models/user");

// Landing page

router.get("/", function(req, res){
	res.render("landing");
});

// =======================
// Auth Routes
// =======================

// show register form
router.get("/register", function(req, res){
	res.render("register");
});


// handle signUp logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username , email: req.body.email , phone: req.body.phone , address: req.body.address , password: req.body.password});
	User.register(newUser , req.body.password , function(err, user){
		if(err){
			console.log(err);
			return res.render("register");	
			
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/login");
		});
	});
});


// Show login form
router.get("/login", function(req, res){
	res.render("landing");
});



// Handling login logic
router.post("/login", passport.authenticate("local", 
		{successRedirect: "/visitors",
		failureRedirect: "/login",
		failureMessage: "Please SignUp first"
	}),function(req, res){		
});



//Logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
}); 

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}


module.exports = router;
