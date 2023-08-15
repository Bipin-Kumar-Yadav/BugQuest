// sign up
// login
// send otp
// update password

const OTP = require("../models/OTP");
const User = require("../models/User");
const optGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken")
require("dotenv").config();

//send otp

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    // check user present
    const userPresent = await User.findOne({ email });
    if (userPresent) {
      return res.status(400).json({
        success: false,
        error: "User Already Registered",
      });
    }

    var otp = optGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);
    const result = await OTP.findOne({ otp: otp });
    console.log(result);
    while (result) {
      otp = optGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    const otpPayload = { email, otp };
    
    const otpBody = await OTP.create(otpPayload);
    return res.status(200).json({
      success: true,
      data: otp,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: "while Generating OTP",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, otp, role } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        error: "All Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and Confirm Password doesnot match",
      });
    }

    // check user already exits
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already Present",
      });
    }
    // otp check
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Otp not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        error: "Invalid OTP",
      });
    }

    // hashpassword
    const hashedPassword = await bcrypt.hash(password, 10);

    // create profile detail
    const profileDetails = await Profile.create({
      gender: null,
      contactNo: null,
      dataOfBirth: null,
      about: null,
    });
    // create user
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      password: hashedPassword,
      additionalDetails: profileDetails,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error While signup",
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "No User Found with given mail",
      });
    }

    // token creation
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      // save token to user
      user.token = token;
      user.password = undefined;

      // cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
     res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
    });
    }
    else{
        return res.status(401).json({
            success: false,
            message: `Password is incorrect`,
        });
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: "Error While login",
    });
  }
};

module.exports = {
    sendOtp,
    signup,
    login,
};