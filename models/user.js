var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
        username: String,
        email: String,
        phone   : String,
        password: String,
        address: String,
        id: [{
                type: mongoose.Schema.Types.ObjectId,
                 ref: "User"
                 } 
                ],
       
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);