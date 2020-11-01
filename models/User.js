// Import Mongoose package
const mongoose = require("mongoose");

// User data model (User model in Angular)
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model("Users", UserSchema);