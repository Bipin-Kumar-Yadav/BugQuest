import React from 'react'
import Template from '../components/core/Auth/Template'
const Login = () => {
  return (
    <div className='h-full flex items-center'>
      <Template 
        title="Welcome Back"
        description = "Join the Hunt for Software Vulnerabilities and Make a Difference"
        formType = "login"
      />
    </div>
  )
}

export default Login
