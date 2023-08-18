const mongoose = require("mongoose")


const bugSchema =  new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ["Open","In Progress","Closed"],
        default : "Open",
    },
    priority : {
        type : String,
        enum : ["Low","Medium", "High"],
        default : "Low"
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
    ,
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    bugUrl:{
        type:String,
    },
    resolveUrl:{
        type : String,
    }

})

module.exports = mongoose.model("Bug",bugSchema)