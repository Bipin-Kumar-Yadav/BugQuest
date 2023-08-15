import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const Template = ({title,description,formType}) => {
  return (
    <div className='w-[90%] lg:w-[50%] mx-auto '>
        <div className=' rounded-lg  bg-richblue-700 backdrop-blur-lg px-10 py-5 '>
            <h1 className=' text-3xl font-bold text-button text-center'>{title}</h1>
            <p className=' text-center font-semibold text-richblack-25  mt-3 mb-4'>{description}</p>
            {
                formType === "signup" ? <SignupForm/> : <LoginForm/>
            }
        </div>
    </div>
  )
}

export default Template
