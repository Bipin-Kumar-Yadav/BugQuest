import React from "react";
import { useForm } from "react-hook-form";
import { AiFillWechat } from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";
import { TbPhoneCall } from "react-icons/tb";
const ContactUs = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState : {errors,isSubmitSuccessful},
    } = useForm();
  return (
    <div className=" w-11/12 max-w-maxContent flex flex-col md:flex-row justify-center h-full gap-10  mx-auto mt-8 md:mt-32 mb-10">
      <div className="flex w-[100%] md:w-[30%] flex-col gap-4 border border-richblack-50  bg-richblue-900 h-fit px-6 py-3 rounded-md">
        <div className="flex gap-4 text-richblack-25 ">
          <AiFillWechat className="mt-1 text-[30px]"/>
          <div>
            <h2>Chat on us</h2>
            <p>Our friendly team is here to help.</p>
            <p>@ mail address</p>
          </div>
        </div>
        <div className="flex gap-4 text-richblack-25 ">
          <TbWorldWww className="mt-1 text-[30px]" />
          <div>
            <h2>Visit us</h2>
            <p>Come and say hello at our website </p>
            <p>kdjfsls</p>
          </div>
        </div>
        <div className="flex gap-4 text-richblack-25">
         <TbPhoneCall className="mt-1 text-[30px]"/>
          <div>
            <h2>Call us</h2>
            <p>Mon - Fri From 8am to 9pm</p>
            <p>9934798274</p>
          </div>
        </div>
      </div>
      <form className="w-[100%] md:w-[45%] flex flex-col  gap-4 border border-richblack-50 px-6 py-3 bg-richblue-900 text-richblack-25 rounded-md ">
        <h2 className="text-4xl text-button font-bold text-center mx-auto">Got a idea? We've got the skills. Let's team up</h2>
        <p className="text-richblack-100 font-semibold mx-auto">Tell us more about yourself and what you're got in mind.</p>
        <label htmlFor="firstName">
            <p className=" text-richblack-25 font-bold">First Name</p>
            <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter First Name"
                {...register("firstName",{required:true})}
                className="w-full px-3 py-2 rounded-md bg-richblue-800"
            >
                {errors.firstName && (<span>Please Enter Your First Name Here</span>)}
            </input>
        </label>
        <label htmlFor="lastName">
            <p  className=" text-richblack-25 font-bold">Last Name</p>
            <input
                 type="text"
                name= "lastName"
                id="lastName"
                placeholder="Enter Last Name"
                {...register("lastName",{required:true})}
                className="w-full px-3 py-2 rounded-md bg-richblue-800"
            >
                {errors.lastName && (<span>Please Enter Your Last Name</span>)}
            </input>
        </label>
        <label htmlFor="contactNo">
            <p  className=" text-richblack-25 font-bold">
                Phone Number
            </p>
            <input
                type="number"
                name="contactNo"
                id="contactNo"
                placeholder="Enter Your Contact Number"
                {...register("contactNo",{required:true})}
                className="w-full px-3 py-2 rounded-md bg-richblue-800"
            >
                {errors.contactNo && (<span>Please Enter Your Contact Number</span>)}
            </input>
        </label>
        <label htmlFor="message">
            <p  className=" text-richblack-25 font-bold">Message</p>
            <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Enter Your Message Here"
                {...register("message",{required:true})}
                className="w-full px-3 py-2 rounded-md bg-richblue-800"
            >
                {errors.message && (<span>Please Enter message here</span>)}
            </textarea>
        </label>
        <button type="submit" className=" text-center bg-button px-6 py-2 rounded-md text-white">
            Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
