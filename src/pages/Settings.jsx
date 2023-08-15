import React, { useEffect, useState } from "react";
import Btn from "../components/common/Btn";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, userDetails } from "../services/operations/userAPI";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.profile)

  const {token} = useSelector((state)=> state.auth)
  const navigate = useNavigate();


  

  const submitProfileForm = (data)=>{
    console.log(data)
    try{
        dispatch(updateProfile(token,data,navigate))
        reset(data)
    }
    catch(error){
      console.log(error)
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState : {errors}
  } = useForm();
  return (
    <div>
      {
        !user ? (<div>Loading...</div>) : (
          <form onSubmit={handleSubmit(submitProfileForm)} className=" flex flex-col gap-2 bg-richblue-600 px-10 py-5 rounded-md">
          <h2 className="text-richblack-25 font-bold text-xl">Personal Informations</h2>

          {/* first Name last Name  */}
          <div className="flex gap-6">
            
            <label htmlFor="firstName" className="flex  flex-col  gap-2 text-richblack-25 font-semibold  w-[45%]">
             First Name :
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  {...register("firstName",{required:"First Name is required"})}
                  defaultValue={user?.firstName}
                  className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                />
                  {errors.firstName && (<span>{errors.firstName.message}</span>)}
            </label>
            <label
              htmlFor="lastName" className="flex flex-col gap-2 text-richblack-25 font-semibold w-[45%]"
            >
              Last Name :
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  {...register("lastName",{required:"Last Name is required"})}
                  defaultValue={user?.lastName}
                  className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                />
                  {errors.lastName && (<span>{errors.lastName.message}</span>)}
            </label>
          </div>

          {/* dob and gender  */}
          <div className="flex gap-6">
            <label htmlFor="dateOfBirth"
            className="flex flex-col text-richblack-25 font-semibold gap-2 w-[45%]"
            >
              Date of Birth :
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="dd/mm/yy"
                {...register("dateOfBirth")}
                defaultValue={user?.additionalDetails?.dateOfBirth}
                className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
              >
                {
                  errors.dateOfBirth && (
                    <span>Please select valid date</span>
                  )
                }
              </input>
            </label>
            <label 
            htmlFor="gender" className="flex flex-col w-[45%] gap-2 text-richblack-25 font-semibold"
            >
                Gender :
                <select
                  id="gender"
                  name="gender"
                  type= "text"
                  {...register("gender")}
                  className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                  {
                    errors.gender && (<span>Enter Your Gender</span>)
                  }
                </select>
            </label>
          </div>

          {/* contact No  */}

          <div className="flex gap-6">
                  <label className="flex flex-col w-[95%] gap-2 text-richblack-25 font-semibold" htmlFor="contactNo"
                  >
                  Contact Number :
                  <input
                    type="tel"
                    id="contactNo"
                    name="contactNo"
                    placeholder="Enter your Contact Number"
                    {...register("contactNo")}
                    defaultValue={user?.additionalDetails?.contactNo}
                    className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                  />
                    {errors.contactNo && (<span>{errors.contactNo.message}</span>)}
                  </label>

          </div>
          {/* about  */}

          <div >
                  <label 
                    className="flex flex-col w-[95%] text-richblack-25 font-semibold gap-2" htmlFor="about"
                  >
                  About :
                  <input
                    type="text"
                    id="about"
                    name="about"
                    placeholder="Enter about yourself"
                    {...register("about",)}
                    defaultValue={user?.additionalDetails?.about}
                    className='text-richblack-300 bg-richblue-900 w-full px-6 py-3 rounded-lg'
                  >
                    {errors.about && (<span>Enter about Yourself</span>)}
                  </input>

                  </label>
          </div>
           <div className="flex  justify-between items-center">
           <Btn onClick={()=>navigate("/dashboard/my-profile")}>
              Cancle
            </Btn>
            <Btn  type={"submit"}>Save</Btn>
           </div>
      </form>
        )
      }
    </div>
  );
};

export default Settings;
