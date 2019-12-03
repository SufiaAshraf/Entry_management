var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	passport   = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	visitor    =require("./models/visitors"),
	feedback   = require("./models/feedback"),
	User       = require("./models/user"),
	// seedDB     = require("./seed"),
	path       = require("path"),
	session    = require("express-session"),
    nodemailer = require("nodemailer"),
	visitorsRoutes = require("./routes/visitors"),
	indexRoutes     = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/Entry_management", {useNewUrlParser: true, useUnifiedTopology: true}, );
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(methodOverride("_mehtod"));

// PASSPORT CONFIGURATION
app.use(session({
	secret : "Jawwad just brags about himself.He's not a genius",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Setting Local Host
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end();
});


// Routes
app.use(indexRoutes);
app.use(visitorsRoutes);


// Middleware
app.use((req,res,next)=>{
	if(req.user) {
		req.username = req.user.username
	}
	next()
})



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
