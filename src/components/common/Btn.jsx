import React from 'react'

const Btn = ({children,onClick,type}) => {

  return (
    <div>
      <button onClick={onClick} type={type} className='rounded-md  bg-carribiangreen-600 px-4 py-2'>{children}</button>
    </div>
  )
}

export default Btn
