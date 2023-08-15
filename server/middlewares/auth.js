// auth 
// isDevelopr 
// isTester

const jwt = require("jsonwebtoken")
const User = require("../models/User")
require("dotenv").config();

exports.auth = async(req,res,next) =>{
    try{
        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
        console.log("AFTER ToKEN EXTRACTION");
        
        if(!token){
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
        console.log("Token is ",token)
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(error){
            console.log(error)
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            error : "Error while validating user"
        })
    }
}

exports.isDeveloper = async (req, res, next) => {
    try{
           if(req.user.role !== "Developer") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Developer only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }

   exports.isTester = async (req, res, next) => {
    try{
           if(req.user.role !== "Tester") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Tester only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }