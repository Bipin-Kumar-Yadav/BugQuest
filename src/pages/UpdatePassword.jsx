import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit= (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1)
    console.log("Token is",token)
    const newToken = token.replace(".","")
    dispatch(resetPassword(password, confirmPassword, newToken, navigate))
    setFormData({
      password:"",
      confirmPassword:""
    })
  }

  return (
    <div className="flex h-full items-center justify-center bg-richblue-25 rounded-md mt-20 border border-richblack-700 w-fit">
      {loading ? (
        <div></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-3xl text-black font-bold">Choose new password</h1>
          <p className="font-semibold text-richblack-700 mt-3">Almost done. Enter your new password and youre all set.</p>
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-5 mt-3">
            <label>
              <p className=" text-richblack-600 font-bold">New Password</p>
              <input
                required
                type={showpassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Enter Your Password"
                onChange={handleOnChange}
                className="w-full px-3 py-2 rounded-md bg-orangeshade"
              ></input>
              <span
                className="absolute right-3 top-[75%] z-[10] cursor-pointer translate-y-[20px] -translate-x-10 text-richblack-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showpassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </label>

            <label>
              <p className=" text-richblack-600 font-bold">Confirm new Password</p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Enter Your Password"
                onChange={handleOnChange}
                className="w-full px-3 py-2 rounded-md bg-orangeshade"
              ></input>
              <span
                className="absolute right-3 top-[75%] z-[10] cursor-pointer translate-y-[20px] -translate-x-10 text-richblack-400"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </label>
            <button
              className="font-semibold w-full py-2 px-6 rounded-lg mt-5 bg-button text-white hover:bg-black hover:text-white transition-all duration-200 hover:scale-95"
              type="submit"
            >
              Reset Password
            </button>
          </form>
          <div className="flex justify-between mt-3">
            <div>
              <Link to="/login">
                <p>Back to login</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
