import { useEffect, useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"

import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef();
  
  useEffect(()=>{
    let handler= (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false)
      }
    }
    document.addEventListener("mousedown",handler)


    return()=>{
      document.removeEventListener("mousedown",handler)
    }
  })  

  if (!user)
     return null;
  return (
    <div ref={menuRef} >
      <button onClick={()=>setOpen((prev)=>!prev)} className="flex items-center " >
        <img src={user?.image} className="rounded-full" width={40}/>
        <AiOutlineCaretDown className="text-lg bg-transparent text-button"/>
      </button>
      {
        open && (
          <div className="flex flex-col absolute bg-transparent px-6 py-3 -translate-x-12 ">
          <div className="flex items-center gap-2 text-richblack-25
          ">
            <NavLink to={"/dashboard/my-profile"}
              onClick={()=>setOpen((prev)=>!prev)}
            >Dashboard</NavLink>
            <VscDashboard/>
          </div>
          <div className="flex items-center gap-2 text-richblack-25 ">
            <NavLink onClick={()=> {
              dispatch(logout(navigate))
              setOpen((prev)=>!prev)
            }}>Logout</NavLink>
            <VscSignOut/>
          </div>
          </div>
        )
      }
    </div>
  )
}
