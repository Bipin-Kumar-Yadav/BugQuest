import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // 
  return (
    <div className="flex fixed w-[16%] flex-col gap-3 h-screen  bg-richblack-900  text-richblack-25 items-center text-center">
      <NavLink
        to={"/dashboard/my-profile"}
        className={`relative w-full py-3 ${
          matchRoute("/dashboard/my-profile")
            ? "bg-richblue-900"
            : "bg-transparent"
        }`}
      >
        <span
          className={`absolute top-0 left-0 h-full w-[0.2rem]  bg-carribiangreen-600 ${
            matchRoute("/dashboard/my-profile") ? "opacity-100" : "opacity-0"
          }`}
        ></span>
        <p>My Profile</p>
      </NavLink>
      <NavLink
        to={"/dashboard/bugs"}
        className={`relative w-full py-3 ${
          matchRoute("/dashboard/bugs") ? "bg-richblue-900" : "bg-transparent"
        }`}
      >
        <span className={`absolute top-0 left-0 h-full w-[0.2rem]   bg-carribiangreen-600 ${matchRoute("/dashboard/bugs")?"opacity-100":"opacity-0"}`}></span>
        <p>Bug List</p>
      </NavLink>
      <NavLink
        to={"/dashboard/settings"}
        className={`relative w-full py-3 ${
          matchRoute("/dashboard/settings")
            ? "bg-richblue-900"
            : "bg-transparent"
        }`}
      >
        <span
          className={`absolute top-0 left-0 h-full w-[0.2rem]  bg-carribiangreen-600 ${
            matchRoute("/dashboard/settings") ? "opacity-100" : "opacity-0"
          }`}
        ></span>
        <p>Settings</p>
      </NavLink>
      <NavLink onClick={() => dispatch(logout(navigate))} className="w-full">
        <p>Logout</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
