var express = require("express");
var router  = express.Router();
var mongoose = require('mongoose');
var feedback = require("../models/feedback");
var visitor = require("../models/visitors");
var User     = require('../models/user');
var bodyParser = require('body-parser');
var session = require("express-session");
var nodemailer = require('nodemailer');
var methodOverride = require("method-override");

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(methodOverride("_mehtod"));

//Setting the local time
var indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
indiaTime = new Date(indiaTime);



// messages to be sent
var msgtohost = "Hey! A visitor has come to visit you. Details of visitor are as follows:"
var msgtovisitor = "Thanks for visiting us.Looking forward to meeting you soon."



// Used Nexmo API to send SMS to host
const Nexmo = require('nexmo')
require('dotenv').config();



// transporter to send Email
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		   user: process.env.EMAIL,
		   pass: process.env.PASSWORD
	   }
   });  



// Setting my visitor page   
router.get("/visitors", isLoggedIn , function(req, res){
	// Get all visitors from database
	visitor.find({}, function(err, allvisitors){
		if(err){
			console.log(err);
		}else{
			 res.render("visitors" ,{visitors: allvisitors});
		}
	});
	
});



// CREATE visitor route
router.post("/visitors",isLoggedIn, hostDetails , function(req, res) {
		// get data from form and add to array
		var name = req.body.name;
		var email = req.body.email;
		var phone = req.body.phone;
		var checkIn =   indiaTime.toLocaleString();
		var NEWVisitor = {name: name, email: email, phone: phone ,checkIn: checkIn} ;
		
		// Add new visitor and save it to database
		visitor.create(NEWVisitor, function(err, newlyCreated){
			if(err){
				console.log(err);
			}else {
				// redirect back to visitors page
				res.redirect("/visitors");
		
		
		// Sending mail to host when visitor checks-In

		const mailOptions = {
			from: process.env.EMAIL, // sender address
			to: req.user.email, // list of receivers
			subject: 'New Visitor just Checked-in', // Subject line
			text: `${msgtohost}\n\n\n Name - ${name}\n Email - ${email}\n Phone No- ${phone}\nCheck-In Time- ${checkIn}`
					
		};

		console.log(mailOptions)
		transporter.sendMail(mailOptions , function (err, info) {
			if(err){
				console.log("Error Occurred")
			  console.log(err)
			}
			
			else{
				console.log("EMAIL SENT TO HOST about the currently checked in visitor SUCCESSFULLY!!")
				console.log(info);
			}
		res.redirect("/visitors")	
	 });
	
	 	// Sending SMS to host when Visitor checks In
	 	// SMS can't be send to number other than a few White-listed contacts
		// My white-listed contacts are 919670785220, 916388425599, 918057471264, 919870843501
		// It can be done after a premium is purchased
	 	// So to check whether SMS is sent I get Message sent succesfully without any error
	
		const nexmo = new Nexmo({
			apiKey: '7d03b9b2',
			apiSecret: 'N2deWPyWynAozwxL'
		  })
		  
		 const from = 918057471264
		 const to = 919670785220
		 const text = `${msgtohost}\n\n\n Name - ${name}\nEmail - ${email}\nPhone - ${phone}\nCheck-In Time - ${checkIn}`
	 
		 nexmo.message.sendSms(from, to, text, (err, responseData) => {
			if (err) {
				console.log(err);
			} else {
				if(responseData.messages[0]['status'] === "0") {
					console.log("Message sent successfully to the current host.");
				} else {
					console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
				}
			}
		 })
		}
	});
});



// Show form for new visitor
router.get("/visitors/new" ,isLoggedIn, function(req, res){
	res.render("new");
});


// Show feedback form to the visitor checking Out
router.get("/visitors/:id", function (req, res){
	// find the visitor with provided id
	visitor.findById(req.params.id, function(err, foundVisitor){
		if(err){
			console.log(err);
		}
		else{
			// render the feedback template of that visitor.
			res.render("end", {visitor: foundVisitor});
		}
	});
});	



// Redirect to visitors page after user checks out and remove it from visitors page
router.post("/visitors/:id",isLoggedIn,  hostDetails ,function(req, res){
	
	// lookup for visitor using id
	visitor.findByIdAndRemove(req.params.id, function(err, foundvisitor2){
		if(err){
			console.log(err)
		} else{

	// Sending Mail to visitor when he/she checks out
			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.EMAIL,
					pass: process.env.PASSWORD
				}
			});  
			const mailOptions = {
				from: process.env.EMAIL, // sender address
				to: foundvisitor2.email , // list of receivers
				subject: 'You are Checking-out', // Subject line
				text: `${msgtovisitor}\n\n\nYour Name - ${foundvisitor2.name}\n Your Email - ${foundvisitor2.email}\nPh No - ${foundvisitor2.phone}\nYour Checkin Time - ${foundvisitor2.checkIn}\nYour Checkout Time - ${indiaTime.toLocaleString()}\nHost's Name - ${req.user.username}\nAddress Visited - ${req.user.address}\n` ,// plain text body
			};

			console.log(mailOptions)
			console.log(transporter)
			transporter.sendMail(mailOptions, function (err, info) {
				if(err){
					console.log("Error Occurred")
				console.log(err)
				}
				
				else{
					console.log("Email sent to visitor SUCCESFULLY!!!!")
					console.log(info);
				}
		 });	 
			res.redirect("/visitors")
		}
	});	
});	



// MIDDLEWARES

function hostDetails (req,res,next){
	if(req.user) {
		req.username = req.user.username
		req.email = req.user.email
		req.address = req.user.address
	}
	next();
}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	// req.email = req.User.email;
	res.redirect("/");
}



module.exports = router;
