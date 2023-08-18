import React from "react";
import {HiOutlineBugAnt} from "react-icons/hi2"
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authAPI";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

const Navbar = () => {
  const location = useLocation();
  const {token} = useSelector((state) => state.auth)
  const NavLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
  ];
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-14 items-center fixed w-full  bg-richblack-900 justify-center py-1 border-b-[1px] border-b-richblue-900">
      <div className=" w-11/12 max-w-maxContent mx-auto items-center flex text-center justify-between">
        {/* logo */}
        <Link to="/">
          <div className=" text-3xl font-inter flex items-center font-bold gap-2 text-richblack-25">
          <HiOutlineBugAnt className="text-[30px]"/>
          <p>BugQuest</p>
          </div>
        </Link>

        {/* navs */}
        <nav>
          <ul className="flex gap-10 hover:cursor-pointer text-xl">
            {NavLinks.map((ele, idx) => (
              <li key={idx}>
                <Link to={ele.path}>
                  <p
                    className={`${
                      matchRoute(ele?.path) ? " text-button font-bold" : "text-richblack-25"
                    }`}
                  >
                    {ele.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* buttons */}
        <div className="flex gap-2">
          {token === null && (
            <Link to="/login">
              <button className=" bg-richblue-900 text-button px-[8px] py-[6px]  hover:border-none hover:bg-button hover:text-white hover:scale-95 rounded-md">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className=" bg-richblue-600 text-button hover:border-none  hover:bg-button hover:text-white hover:scale-95 px-[8px] py-[6px]  rounded-md">
                Sign Up
              </button>
            </Link>
          )}
          {
            token !== null && (
              <ProfileDropdown/>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
