import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ResetPassword = () => {
  const {loading} = useSelector((state)=>state.auth)
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));
}
  return (
    <div className="flex h-full justify-center items-center">
      {loading ? (
        <div></div>
      ) : (
        <div className="flex flex-col h-fit  gap-2 bg-richblue-700 px-10 py-5 rounded-lg max-w-[650px]">
          <h1 className="text-3xl text-button font-bold">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>
          <p  className=" text-richblack-200 font-bold">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
              : `We have sent the email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
            {!emailSent && (
              <label className="flex flex-col gap-2">
                <p  className=" text-richblack-25 font-bold">Email Address :</p>
                <input
                  required
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className=" bg-richblue-800 rounded-md px-6 py-2 w-full  text-richblack-200 font-semibold"
                />
                <button
                  className="font-semibold w-fit py-2 px-6 rounded-lg mt-5 bg-button text-white hover:bg-black hover:text-white transition-all duration-200 hover:scale-95"
                  type="Submit"
                >
                  {!emailSent ? "Reset Password" : "Resend Email"}
                </button>
              </label>
            )}
          </form>
          <div className="text-richblack-25">
            <Link to="/login">Back to login</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
