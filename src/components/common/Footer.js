import React from 'react'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import {HiOutlineBugAnt} from "react-icons/hi2"

const Footer = () => {
  return (
    <div className='flex flex-col gap-5 text-richblack-25 py-2 items-center'>
    <div className='font-bold text-3xl font-inter flex flex-col gap-2 items-center'>
      <HiOutlineBugAnt className='font-bold text-3xl'/>
      <p>BugQuest</p>
    </div>
    <div className='flex flex-wrap justify-center gap-6'>
      <FaFacebook className='text-2xl md:text-3xl lg:text-4xl' />
      <FaGoogle className='text-2xl md:text-3xl lg:text-4xl' />
      <FaTwitter className='text-2xl md:text-3xl lg:text-4xl' />
      <FaYoutube className='text-2xl md:text-3xl lg:text-4xl' />
    </div>
    <div className="text-center">Made with ❤️ BugQuest © 2023</div>
  </div>
  )
}

export default Footer
