import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setSignUpData} from "../../../slices/AuthSlice";
import {sendOtp} from '../../../services/operations/authAPI'

const SignupForm = () => {
  const navigate  = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("Developer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } = formData;

 

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };



  const handleOnSubmit = (e)=>{
    e.preventDefault();
    const signupData = {
      ...formData,
      role,
    }
    
    dispatch(setSignUpData(signupData));
    dispatch(sendOtp(formData.email,navigate));

    setFormData({
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:"",

    })
    setRole("Developer")
  }
  return (
    <div>
      <form onSubmit={handleOnSubmit} className=" flex flex-col gap-4 ">
        <div className=" flex gap-8 ">
          <label className="w-[45%] flex flex-col gap-2 ">
            <p className=" text-richblack-25 font-semibold">First Name :</p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Enter Your First Name"
              onChange={handleOnChange}
              className=" bg-richblue-900 rounded-md px-6 py-2 w-full  text-richblack-200 font-semibold"
            ></input>
          </label>
          <label  className="w-[45%] flex flex-col gap-2 ">
            <p className=" text-richblack-25 font-semibold">Last Name :</p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Enter Your Last Name"
              onChange={handleOnChange}
              className=" bg-richblue-900 rounded-md px-6 py-2 w-full  text-richblack-200 font-semibold"
            ></input>
          </label>
        </div>
        <div className="flex gap-8">
          <label className="w-[45%] flex flex-col gap-2 ">
            <p className=" text-richblack-25 font-semibold">Email Address :</p>
            <input
              required
              type="text"
              name="email"
              value={email}
              placeholder="Enter Your Email Address"
              onChange={handleOnChange}
              className=" bg-richblue-900 rounded-md px-6 py-2 w-full mt-1  text-richblack-200 font-semibold"
            ></input>
          </label>
          <label className="w-[45%] flex flex-col gap-2 ">
            <p className="text-richblack-25 font-semibold">Role :</p>
            <select
              value={role}
              onChange={handleRole}
              className=" bg-richblue-900 rounded-md px-6 py-2 w-full t-1  text-richblack-200 font-semibold"
              
            >
              <option className=" bg-richblue-800 hover:bg-richblack-900"  value={"Devloper"}>Devloper</option>
              <option className="bg-richblue-800  hover:bg-richblack-900" value={"Tester"}>Tester</option>
            </select>
          </label>
        </div>
        <div className="flex gap-8">
          <label className=" relative w-[45%] flex flex-col gap-2 ">
            <p className=" text-richblack-25 font-semibold">Password :</p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={handleOnChange}
              className=" bg-richblue-900 text-richblack-25 font-semibold  rounded-md px-6 py-2 w-full mt-1"
            ></input>
            <span
              className="absolute right-3 top-[38px] z-[10] translate-y-[8px] text-richblack-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>
          <label className="relative w-[45%] flex flex-col gap-2 ">
            <p className=" text-richblue-25 font-semibold">Confirm Password :</p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Your Password"
              onChange={handleOnChange}
              className=" bg-richblue-900 text-richblack-25 font-semibold rounded-md px-6 py-2 w-full mt-1"
            ></input>
            <span
              className="absolute right-3 top-[38px] z-[10] cursor-pointer translate-y-[8px] text-richblack-400"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </label>
        </div>
        <button
              className="font-semibold w-[95%] py-2 px-6 rounded-lg mt-5 bg-button text-white hover:border-none hover:bg-black hover:text-white transition-all duration-200 hover:scale-95"
              type="submit"
            >
              Sign Up
            </button>
      </form>
    </div>
  );
};

export default SignupForm;
