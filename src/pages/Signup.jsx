import React from 'react'
import Template from '../components/core/Auth/Template'

const Signup = () => {
  return (
    <div className='flex h-full items-center'>
      <Template
        title = "Unleash Your Bug Hunting Skills"
        description = "Join the Hunt for Software Vulnerabilities and Make a Difference"
        formType = "signup"
      />
    </div>
  )
}

export default Signup
