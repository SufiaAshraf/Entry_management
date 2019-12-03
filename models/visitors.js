
var mongoose = require("mongoose");

// Schema Setup
var visitorSchema = new mongoose.Schema({
	name: String,
	email: String,
    phone: String,
    checkIn: String,
   
    id: [{
      type: mongoose.Schema.Types.ObjectId,
       ref: "visitors"
       } 
      ],
    feedbacks: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "feedback"
        }
     ]
});

module.exports = mongoose.model("visitor" , visitorSchema);