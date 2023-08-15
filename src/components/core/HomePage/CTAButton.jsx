import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children,active,linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`font-semibold
              w-fit py-1 lg:py-3 md:py-1 rounded-lg hover:bg-black hover:text-white hover:border-none transition-all duration-200 hover:scale-95
            ${active ? "  bg-button text-white px-3 lg:px-7 md:px-5" : "bg-white text-button px-1 py-0.5 lg:px-5 md:px-3 border-2"}
        `}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton
