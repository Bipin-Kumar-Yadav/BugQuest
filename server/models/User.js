const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        requred : true,
    },
    role : {
        type : String ,
        enum : ["Developer","Tester"],
        required : true,
    },
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile"
    },
    image : {
        type : String,
        required : true,
    },
    token :{
        type : String
    },
    resetPasswordExpires: {
        type: Date,
    },
})

module.exports = mongoose.model("User",userSchema);