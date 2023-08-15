const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    contactNo : {
        type : Number,
        trim : true,
    }
    ,
    gender : {
        type : String,
    },
    about : {
        type : String,
    }
    ,
    dateOfBirth : {
        type : String,
    }
})

module.exports = mongoose.model("Profile",profileSchema)