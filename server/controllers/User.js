// update user profile
// delete user profile
// get all details
// update profile photo

const User = require("../models/User")
const Profile = require("../models/Profile")

const updateProfile = async (req,res) =>{
    try{
        const {firstName,lastName,contactNo,gender,about,dateOfBirth} = req.body;
        // console.log("Yaha Tak aaya")
        const userId = req.user.id;
        
        console.log(firstName,lastName,contactNo,gender,dateOfBirth,about);

        const userDetails = await User.findById(userId);

        const user = await User.findByIdAndUpdate(
            {_id:userId},
            {
                firstName : firstName,
                lastName : lastName,
            },
            {new:true}
        )
            
        const newProfile = await Profile.findById(userDetails.additionalDetails);

        if(contactNo){
            newProfile.contactNo = contactNo
        }
        if(gender){
            newProfile.gender = gender
        }
        if(about ){
            newProfile.about = about
        }
        if(dateOfBirth ){
            newProfile.dateOfBirth = dateOfBirth
        }
        await newProfile.save();
        // const profileDetails = await Profile.findByIdAndUpdate(
        //     userDetails.additionalDetails,
        //     {
        //         contactNo:contactNo,
        //         gender:gender,
        //         about : about,
        //         dateOfBirth : dateOfBirth
        //     },
        //     {new :true}

        // )

        return res.status(200).json({
            success : true,
            data : newProfile,
            message : "Updated successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            error : "Error while updating profile Details"
        })
    }

}

// delete User Profile

const deleteProfile = async(req,res) =>{
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(400).json({
                success : false,
                error : "User Does Not Found"
            })
        }

        await User.findByIdAndDelete({_id:userId});
        return res.status(200).json({
            success : true,
            message : "User Deleted successfully"
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            error : "Error While deleting Profile"
        })
    }
}

// get all details

const userAllDetails = async (req,res) =>{
    try{
        const userid = req.params.userid;

        if(userid){
            const userDetails = await User.findById({_id:userid})
        if(!userDetails){
            return res.status(400).json({
                success : false,
                error : "User does Not exits"
            })
        }
        return res.status(200).json({
            success : true,
            data : userDetails
        })
        }
        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            error : 'Error while fetching user details'
        })
    }
}

// get all devlopers

const getAllDevlopers = async (req,res) =>{
    try{
        const developers = await User.find({role:"Developer"}).populate("firstName").populate("email");
        if(!developers){
            return res.status(400).json({
                success : false,
                error : "No Developers Found"
            })
        }
        return res.status(200).json({
            success : true,
            data : developers
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            error : "Error while getting all developers details"
        })
    }
}

// get all Tester 
const getAllTester = async(req,res) => {
    try{
        const tester = await User.find({},{role : "Tester"});
        if(!tester) {
            return res.status(400).json({
                success : false,
                error : "No Tester Found"
            })
        }
        return res.status(200).json({
            success : true,
            data : tester,
        })
    }
    catch(error){
        return res.status(500).json({
            success :false,
            error : "Error while getting all testers details"
        })
    }
}

// update profle pic
const updateProfilePic = async(req,res) =>{
    try{
        const userId = req.user.id;
        const userDetail = await User.findById(userId);
        if(!userId) {
            return res.status(400).json({
                success : false,
                error : "NOt a valide user "
            })
        }
        
    }catch(error){
        return res.status(500).json({
            success : false,
            error : "Error While updating profile pic"
        })
    }
}

module.exports = {
    updateProfile, 
    updateProfilePic,
    getAllDevlopers,
    userAllDetails,
}