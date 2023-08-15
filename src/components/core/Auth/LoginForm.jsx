import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../../../services/operations/authAPI"

const LoginForm = () => {
  const [showpassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    dispatch(login(email,password,navigate));
    setFormData({
      email:"",
      password:""
    })
  }
  return (
    <div>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <p className=" text-richblack-25 font-semibold">Email Address :</p>
          <input
            required
            name="email"
            type="text"
            value={email}
            placeholder="Enter Your Email Address"
            onChange={handleOnChange}
            className=" bg-richblue-800 rounded-md px-6 py-2 w-full text-richblack-200 font-semibold"
          ></input>
        </label>
        <label className="flex flex-col gap-2">
          <p className=" text-richblack-25 font-semibold">Password :</p>
          <input
            required
            type={showpassword ? "text" : "password"}
            name="password"
            value={password}
            placeholder="Enter Your Password"
            onChange={handleOnChange}
            className=" bg-richblue-800 rounded-md px-6 py-2 w-full  text-richblack-200 font-semibold"
          ></input>
          <span
            className="absolute right-3 top-[75%] z-[10] cursor-pointer -translate-y-16 -translate-x-10 text-richblack-400"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showpassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </label>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
        <button
              className="font-semibold w-full py-2 px-6 rounded-lg mt-5 bg-button text-white hover:bg-black hover:border-none hover:text-white transition-all duration-200 hover:scale-95"
              type="submit"
            >
              Login
            </button>
      </form>
    </div>
  );
};

export default LoginForm;
