import React from 'react'

const HighLightText = ({text}) => {
  return (
    <div>
      <span className='text-button font-bold text-4xl'>
        {"  "}
        {text}
        {" "}
      </span>
    </div>
  )
}

export default HighLightText
