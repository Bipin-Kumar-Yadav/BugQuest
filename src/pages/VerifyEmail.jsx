import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";

const VerifyEmail = () => {
  const {signupData,loading} = useSelector((state)=> state.auth)
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(()=>{
      if(!signupData){
          navigate("/signup")
      }
  },[])
  console.log(signupData," ",loading);
  const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role,
  } = signupData;
  console.log(signupData)
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    dispatch(signUp(firstName,lastName,email,password,confirmPassword,otp,role,navigate))
  }

  return (
    <div className=" flex h-full justify-center items-center text-richblack-25">
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="bg-richblue-600 h-fit rounded-lg px-10 py-6 " >
          <h1 className="text-2xl text-button font-bold">Verify Email</h1>
          <p className="font-semibold mt-3">
            A Verification has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleOnSubmit} className="mt-3 text-richblack-25">
            <OTPInput
              
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator=<span className=" opacity-0">-</span>
              renderInput={(props) => (
                <input {...props} className="bg-richblack-900 px-10 py-5 rounded-lg text-richblack-25 font-semibold w-full" />
              )}
            
            ></OTPInput>
            <button
              className="font-semibold w-full py-2 px-6 rounded-lg mt-5 bg-button text-white hover:bg-black hover:text-white transition-all duration-200 hover:scale-95"
              type="submit"
            >
              Verify Email
            </button>
          </form>
          <div className="flex justify-between mt-3">
            <div>
              <Link to="/login">
                <p>Back to login</p>
              </Link>
            </div>
            <button onClick={()=> dispatch(sendOtp(email,navigate))}>Resent it</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
