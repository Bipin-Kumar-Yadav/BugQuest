const User = require("../models/User")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const mailSender = require("../utils/mailSender")

exports.resetPasswordToken = async (req,res) => {
    try{
        const {email} = req.body

        const checkUser = await User.findOne({email:email});

		console.log("email is", email);

        if(!checkUser ){
            return res.status(401).json({
                success : false,
                error : "User doesn't exits"
            })
        }

        const token = crypto.randomBytes(20).toString("hex");

        const updateDetails  = await User.findOneAndUpdate(
            {email:email},
            {
                token : token,
                resetPasswordExpires : Date.now() + 3600000
            }
        )
        const url = `http://localhost:3000/update-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});

    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            success : false,
            error : "Error while generating Reset pass token"
        })
    }
}

exports.resetPassword = async (req,res) => {
    try {
		const { password, confirmPassword, token } = req.body;
		console.log("Toekn is",token);
        console.log(password," ",confirmPassword)
		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				data : userDetails,
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
}