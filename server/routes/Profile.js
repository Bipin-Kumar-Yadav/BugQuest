const express = require("express")
const router = express.Router();


const {updateProfile,updateProfilePic,getAllDevlopers,userAllDetails} = require("../controllers/User");

const {auth} = require("../middlewares/auth")

router.post("/update-profile",auth,updateProfile)

router.post("/update-profleImage",auth,updateProfilePic);

router.get("/getAll-developers",getAllDevlopers);

router.get("/userAllDetails/:userid",userAllDetails)

module.exports = router