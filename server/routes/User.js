const express = require("express")
const router = express.Router();

const {login,signup,sendOtp} = require("../controllers/Auth")
const {resetPasswordToken,resetPassword} =  require("../controllers/ResetPassword")

// const {auth} = require("../middlewares/auth")

// router for login signup and sendotp
router.post("/login",login)

router.post("/signup",signup)
router.post("/sendotp",sendOtp)
router.post("/reset-pass-token",resetPasswordToken)
router.post("/reset-pass",resetPassword)


module.exports = router