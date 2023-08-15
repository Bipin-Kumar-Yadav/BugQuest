import React from "react";
import Btn from "../components/common/Btn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const submitClick = () => {
    navigate("/dashboard/settings");
  };
  return (
    <div className="  flex flex-col gap-7  justify-center  h-fit">
      {/* section 1 */}
      <div className="bg-richblue-600 text-richblack-25 flex flex-col gap-5 rounded-md px-10 py-5">
        <p className="font-bold">Profile Details</p>
        <div className="flex flex-col md:flex-row item-center justify-between">
          <img src={user?.image} width={50} className="rounded-full" />
          <div >
            <p className="text-richblack-5 font-semibold">{user?.firstName}</p>
            <p className="text-richblack-300 ">{user?.email}</p>
          </div>
          <Btn onClick={submitClick}>{"Edit"}</Btn>
        </div>
      </div>
      {/* section 2 */}
      <div className="bg-richblue-600 text-richblack-25 flex flex-col gap-5 rounded-md px-10 py-5">
        <p className="font-bold">Personal Details</p>
        <div className="flex flex-col gap-4">
          {/* first name and last name subsec  */}
          <div className="flex flex-col md:flex-row">
            <div className="w-[100%] md:w-[80%]">
              <p className="text-richblack-5 font-semibold">First Name</p>
              <p className="text-richblack-300">{user?.firstName}</p>
            </div>
            <div className="w-[100%] md:w-[40%]">
              <p className="text-richblack-5 font-semibold">Last Name</p>
              <p className="text-richblack-300">{user?.lastName}</p>
            </div>
          </div>
          {/* email and profession subsec  */}
          <div className="flex flex-col md:flex-row">
            <div className="w-[100%] md:w-[80%]">
              <p className="text-richblack-5 font-semibold">Email</p>
              <p className="text-richblack-300"> {user?.email}</p>
            </div>
            <div className="w-[100%] md:w-[40%]">
              <p className="text-richblack-5 font-semibold">Profession</p>
              <p className="text-richblack-300">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
