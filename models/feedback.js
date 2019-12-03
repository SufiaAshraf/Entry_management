
var mongoose = require("mongoose");

var feedbackSchema = mongoose.Schema({
        text: String,
        author: String
});




module.exports = mongoose.model("feedback", feedbackSchema);