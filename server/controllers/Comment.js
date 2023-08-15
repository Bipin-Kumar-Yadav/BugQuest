// create a comment
const Bug = require("../models/Bug")
const Comment = require("../models/Comment")
const User = require("../models/User")

const comment = async (req,res) =>{
    try{
        const {content,bugId} = req.body();
        const userId = req.user.id;
        
        const userDetail = await User.findById(userId);

        if(!userDetail){
            return res.status(400).json({
                success : false,
                error : "Not a valid User"
            })
        }

        const bugDetails = await Bug.findById(bugId);
        if(!bugDetails){
            return res.status(400).json({
                success : false,
                error : "Not a valid Bug"
            })
        }

        
        
    }catch(error){
        return res.status(500).json({
            success : false,
            error : "Error While commenting on model"
        })
    }
}